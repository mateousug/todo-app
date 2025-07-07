import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTodo() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/todos/${id}`)
      .then(res => res.json())
      .then(data => setTitle(data.title))
      .catch(() => alert('No se pudo cargar el todo'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('El título no puede estar vacío');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (res.ok) {
        navigate('/todos');
      } else {
        alert('Error al editar');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Editar Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
        <button type="button" onClick={() => navigate('/todos')} disabled={loading}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
