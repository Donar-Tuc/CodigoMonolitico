import React, { useState } from 'react';
import { useFetch } from '../logic/useFetch';
import { categorias } from '../const/categorias';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const GetFundaciones = () => {
    const [urlFetch, setUrlFetch] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { data, loading, error } = useFetch(urlFetch);
    const fundaciones = data ? data.list : [];

    const handleClickObtenerTodas = () => {
        setUrlFetch("http://localhost:3001/fundaciones");
    }

    const handleClickObtenerPorEtiqueta = () => {
        setShowModal(true);
    }

    const handleSelectCategoria = (categoria) => {
        const encodedCategoria = encodeURIComponent(categoria);
        const apiUrl = process.env.REACT_APP_API_URL;
        setUrlFetch(`${apiUrl}/fundaciones/etiqueta?etiqueta=${encodedCategoria}`);
        setShowModal(false);
    }

    return (
        <>
            <Button onClick={handleClickObtenerTodas} variant="dark" className="mx-2 mb-2">Obtener todas las fundaciones</Button>
            <Button onClick={handleClickObtenerPorEtiqueta} variant="dark" className="mx-2 mb-2">Obtener fundaciones por necesidades</Button>
            <ListFundaciones fundaciones={fundaciones} loading={loading} error={error} />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccione una categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {categorias.map((categoria, index) => (
                        <Button

                            key={index} 
                            onClick={() => handleSelectCategoria(categoria)}
                            className="mx-2 mb-2"
                            variant='outline-dark'
                        >
                            {categoria}
                        </Button>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    )
}

export function ListFundaciones({ fundaciones, loading, error }) {
    return (
        <div className="fundaciones__container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error while loading organizations: {error.message}</p>
            ) : (
                fundaciones.map((fundacion, index) => (
                    <div className="fundacion" key={fundacion._id}>
                        <h3>{index + 1 + ". " + fundacion.titulo}</h3>
                        <p>{fundacion.descripcion}</p>
                        <br></br>
                    </div>
                ))
            )}
        </div>
    )
}
