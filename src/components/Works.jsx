import React, { useEffect, useState } from 'react'
//  import { projectsData } from './DataJSON'
//  import { statusFilters } from './DataJSON'
import { getLucrari, createLucrare, updateLucrare, deleteLucrare, deleteImage } from '../services/api'
import WorkItems from './WorkItems'
import WorkForm from './WorkForm'
import WorkManager from './WorkManager'

const statusFilters = [
  {
    name: 'all',
    label: 'Toate'
  },
  {
    name: 'visible',
    label: 'Vizibile'
  },
  {
    name: 'hidden',
    label: 'Ascunse'
  }
];

const Works = () => {
     const [statusFilter, setStatusFilter] = useState({name: 'all'});
    const [projects, setProjects] = useState([]);
    //  const [allProjects, setAllProjects] = useState(projectsData);
    const [statusActive, setStatusActive] = useState(0);
    const [showForm, setShowForm] = useState(false);
     const [showManager, setShowManager] = useState(false);
     const [editingProject, setEditingProject] = useState(null);


    useEffect(() => {
        fetchProjects();
    }, [statusFilter,]);

    // const filterProjects = () => {
    //     let filtered = allProjects;

    //     //Filtrare după status
    //     if (statusFilter.name !== "all") {
    //         filtered = filtered.filter((project) => 
    //             project.status === statusFilter.name
    //         );
    //     }

    //     setProjects(filtered);
    // };

    // const handleStatusClick = (e, index) => {
    //     setStatusFilter({name: e.target.dataset.status});
    //     setStatusActive(index);
    // };

    // const addProject = (newProject) => {
    //     const project = {
    //         ...newProject,
    //         id: Math.max(...allProjects.map(p => p.id)) + 1
    //     };
    //     setAllProjects([...allProjects, project]);
    // };

    // const updateProject = (updatedProject) => {
    //     setAllProjects(allProjects.map(project => 
    //         project.id === updatedProject.id ? updatedProject : project
    //     ));
    //     setEditingProject(null);
    // };

    // const deleteProject = (projectId) => {
    //     setAllProjects(allProjects.filter(project => project.id !== projectId));
    // };

    // const toggleProjectStatus = (projectId) => {
    //     setAllProjects(allProjects.map(project => 
    //         project.id === projectId 
    //             ? {...project, status: project.status === 'visible' ? 'hidden' : 'visible'}
    //             : project
    //     ));

    // };
    const fetchProjects = async () => {
    try {
      const response = await getLucrari(statusFilter === 'all' ? null : statusFilter);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
    
  };

  const handleAddProject = async (newProject) => {
    try {
      const formData = new FormData();
      formData.append('title', newProject.title);
      formData.append('descriere', newProject.descriere);
      formData.append('status', newProject.status);
      if (newProject.link_client) {
        formData.append('link_client', newProject.link_client);
      }
      formData.append('image', newProject.image);

      await createLucrare(formData);
      fetchProjects();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

const handleUpdateProject = async (formData) => {
  try {
    const id = formData.get('id') || initialData?.id;
    if (!id) throw new Error('ID-ul lucrării lipsește');

    const response = await updateLucrare(id, formData);
    console.log('Răspuns server:', response.data);
    
    fetchProjects();
    setEditingProject(null);
  } catch (error) {
    console.error('Eroare actualizare:', {
      message: error.message,
      response: error.response?.data
    });
  }
};

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteLucrare(projectId);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleDeleteImage = async (imagePath) => {
    try {
      const filename = imagePath.split('/').pop();
      await deleteImage(filename);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

   const handleToggleProjectStatus = async (projectId) => {
    try {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        await updateLucrare(projectId, {
          status: project.status === 'visible' ? 'hidden' : 'visible'
        });
        fetchProjects();
      }
    } catch (error) {
      console.error('Error toggling project status:', error);
    }
  };

     return (
        <div>
            {/* Butoane de control */}
            <div className="work_controls" style={{marginBottom: '2rem', textAlign: 'center'}}>
                <button 
                    className="button button--flex"
                    onClick={() => setShowForm(!showForm)}
                    style={{marginRight: '1rem'}}
                >
                    {showForm ? 'Ascunde Formular' : 'Adaugă Lucrare'}
                </button>
                <button 
                    className="button button--flex"
                    onClick={() => setShowManager(!showManager)}
                >
                    {showManager ? 'Ascunde Manager' : 'Gestionează Lucrări'}
                </button>
            </div>

            {/* Formular pentru adăugare/editare */}
            {(showForm || editingProject) && (
                <WorkForm 
                    onSubmit={editingProject ? handleUpdateProject : handleAddProject}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProject(null);
                    }}
                    initialData={editingProject}
                />
            )}

            {/* Manager pentru CRUD */}
            {showManager && (
                <WorkManager 
                    projects={projects}
                    onEdit={setEditingProject}
                    onDelete={handleDeleteProject}
                    onToggleStatus={handleToggleProjectStatus}
                />
            )}

            {/* Filtre de status */}
            <div className='work_status_filters' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '0.75rem',
                marginBottom: 'var(--mb-2)',
                marginTop: '1rem'
            }}>
                {statusFilters.map((filter, index) => {
                    return (
                        <span 
                            onClick={(e) => {
                              setStatusFilter(filter.name);
                              setStatusActive(index);
                            }}
                            // data-status={filter.name}
                            className={`${statusActive === index ? 'active-work' : ""} work_item`}
                            key={index}
                            style={{fontSize: '0.8rem'}}
                        >
                            {filter.label}
                        </span>
                    )
                })}
            </div>

            {/* Container pentru lucrări */}
            <div className='work_container container grid'>
                {projects.map((item) => {
                    return <WorkItems item={item} key={item.id}/>
                })}
            </div>

            {projects.length === 0 && (
                <div style={{textAlign: 'center', marginTop: '2rem', color: 'var(--text-color)'}}>
                    Nu există lucrări care să corespundă filtrelor selectate.
                </div>
            )}
        </div>
     )
}

export default Works