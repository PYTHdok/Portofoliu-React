import React from 'react'
import { deleteImage } from '../services/api';

const WorkManager = ({ projects, onEdit, onDelete, onToggleStatus}) => {
    const handleDelete = async (project) => {
        if (window.confirm(`Ești sigur că vrei să ștergi "${project.title}"?`)) {
            try {
        // Șterge imaginea asociată dacă există
        if (project.imagePath) {
          const filename = project.imagePath.split('/').pop();
          await deleteImage(filename);
        }
        await onDelete(project.id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
};

    return (
        <div className="work_manager" style={{
            backgroundColor: 'var(--container-color)',
            padding: '2rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
            <h3 style={{marginBottom: '1.5rem', textAlign: 'center'}}>
                Gestionează Lucrările ({projects.length})
            </h3>
            
            <div className="manager_grid" style={{
                display: 'grid',
                gap: '1rem'
            }}>
                {projects.map(project => (
                    <div key={project.id} className="manager_item" style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr auto',
                        gap: '1rem',
                        alignItems: 'center',
                        padding: '1rem',
                        backgroundColor: project.status === 'hidden' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.5rem'
                    }}>
                        <img 
                            src={`http://localhost:3000${project.imagePath}`} 
                            alt={project.title}
                            style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: '0.5rem'
                            }}
                            onError={(e) => {
                              e.target.src = '/default-image.jpg'; // imagine default
                            }}
                        />
                        
                        <div className="project_info">
                            <h4 style={{
                                fontSize: 'var(--normal-font-size)',
                                fontWeight: 'var(--font-medium)',
                                marginBottom: '0.25rem'
                            }}>
                                {project.title}
                            </h4>
                            <p style={{
                                fontSize: 'var(--small-font-size)',
                                color: 'var(--text-color)',
                                marginBottom: '0.25rem'
                            }}>
                                {project.descriere.substring(0, 60)}...
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                fontSize: 'var(--smaller-font-size)'
                            }}>
                                <span style={{
                                    backgroundColor: project.status === 'visible' ? '#4CAF50' : '#5a5a5aff',
                                    color: 'white',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '0.25rem'
                                }}>
                                    {project.status === 'visible' ? 'Vizibilă' : 'Ascunsă'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="project_actions" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <button
                                onClick={() => onEdit(project)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#1c77c2ff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer',
                                    fontSize: 'var(--small-font-size)'
                                }}
                            >
                                ✏️ Editează
                            </button>
                            
                            <button
                                onClick={() => onToggleStatus(project.id)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: project.status === 'visible' ? '#555555ff' : '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer',
                                    fontSize: 'var(--small-font-size)'
                                }}
                            >
                                {project.status === 'visible' ? '❌ Ascunde' : '👁️ Afișează'}
                            </button>
                            
                            <button
                                onClick={() => handleDelete(project)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#ac2b22ff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer',
                                    fontSize: 'var(--small-font-size)'
                                }}
                            >
                                🗑️ Șterge
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {projects.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    padding: '2rem'
                }}>
                    Nu există lucrări de gestionat.
                </div>
            )}
        </div>
    );
};

export default WorkManager;