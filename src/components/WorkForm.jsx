import React, { useState, useRef } from 'react'
import axios from 'axios';

const WorkForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        descriere: initialData?.descriere || '',
        link_client: initialData?.link_client || '',
        status: initialData?.status || 'visible',
        image: null
    });
    
    const [imagePreview, setImagePreview] = useState(initialData?.image || '');
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

        const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!formData.title || !formData.descriere || !formData.image) {
    //     //if (!formData.title || !formData.descriere || !imageFile) {
    //         alert('Te rog completează toate câmpurile obligatorii si adauga o imagine');
    //         return;
    //     }
        
    //     if (initialData) {
    //         onSubmit({ ...formData, id: initialData.id });
    //     } else {
    //         onSubmit(formData);
    //     }
        
    //     // Reset form
    //     setFormData({
    //         title: '',
    //         descriere: '',
    //         link_client: '',
    //         status: 'visible',
    //         image: ''
    //     });
    //     setImagePreview('');
    // };

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (!formData.title || !formData.descriere) {
                return alert('Completează titlul și descrierea');
            }

            try {
                const submissionData = {
                ...formData,
                id: initialData?.id // Asigură includerea ID-ului
                };

                console.log('Date trimise:', submissionData);
                await onSubmit(submissionData);
            } catch (error) {
                console.error('Eroare submit form:', error);
            }
        };

    return (
        <div className="work_form_container" style={{
            backgroundColor: 'var(--container-color)',
            padding: '2rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
            <h3 style={{marginBottom: '1.5rem', textAlign: 'center'}}>
                {initialData ? 'Editează Lucrarea' : 'Adaugă Lucrare Nouă'}
            </h3>
            
            <form onSubmit={handleSubmit} className="work_form">
                <div className="form_grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div className="form_group">
                        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'var(--font-medium)'}}>
                            Titlu *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '0.5rem',
                                fontSize: 'var(--normal-font-size)'
                            }}
                            required
                        />
                    </div>

                    <div className="form_group">
                        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'var(--font-medium)'}}>
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '0.5rem',
                                fontSize: 'var(--normal-font-size)'
                            }}
                        >
                            <option value="visible">Vizibilă</option>
                            <option value="hidden">Ascunsă</option>
                        </select>
                    </div>

                    <div className="form_group">
                        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'var(--font-medium)'}}>
                            Link Client
                        </label>
                        <input
                            type="url"
                            name="link_client"
                            value={formData.link_client}
                            onChange={handleInputChange}
                            placeholder="https://..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '0.5rem',
                                fontSize: 'var(--normal-font-size)'
                            }}
                        />
                    </div>
                </div>

                <div className="form_group" style={{marginTop: '1.5rem'}}>
                    <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'var(--font-medium)'}}>
                        Descriere *
                    </label>
                    <textarea
                        name="descriere"
                        value={formData.descriere}
                        onChange={handleInputChange}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '0.5rem',
                            fontSize: 'var(--normal-font-size)',
                            resize: 'vertical'
                        }}
                        required
                    />
                </div>

                <div className="form_group" style={{marginTop: '1.5rem'}}>
                    <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'var(--font-medium)'}}>
                        Imagine *
                    </label>
                    <div className="image_upload" style={{
                        border: '2px dashed rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }} onClick={() => fileInputRef.current?.click()}>
                        {imagePreview ? (
                            <div>
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    style={{
                                        maxWidth: '200px',
                                        maxHeight: '150px',
                                        borderRadius: '0.5rem',
                                        marginBottom: '0.5rem'
                                    }}
                                />
                                <p style={{fontSize: 'var(--small-font-size)', color: 'var(--text-color)'}}>
                                    Click pentru a schimba imaginea
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p style={{fontSize: 'var(--normal-font-size)', marginBottom: '0.5rem'}}>
                                    📷 Click pentru a încărca o imagine
                                </p>
                                <p style={{fontSize: 'var(--small-font-size)', color: 'var(--text-color)'}}>
                                    JPG, PNG, GIF până la 5MB
                                </p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{display: 'none'}}
                    />
                </div>

                <div className="form_actions" style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    marginTop: '2rem'
                }}>
                    <button
                        type="submit"
                        className="button"
                        style={{backgroundColor: 'var(--title-color)'}}
                    >
                        {initialData ? 'Actualizează' : 'Adaugă Lucrarea'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="button"
                        style={{backgroundColor: 'var(--text-color)'}}
                    >
                        Anulează
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorkForm;