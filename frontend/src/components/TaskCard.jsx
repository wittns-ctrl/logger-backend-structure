import React from 'react';
import { Trash2, Edit2, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={18} color="var(--success)" />;
      case 'in-progress': return <Clock size={18} color="var(--warning)" />;
      default: return <AlertCircle size={18} color="var(--text-secondary)" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 5: return '#ef4444'; // critical red
      case 4: return '#f97316'; // orange
      case 3: return '#f59e0b'; // amber
      case 2: return '#eab308'; // yellow
      case 1: return '#84cc16'; // lime
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '4px', backgroundColor: getPriorityColor(task.priority) }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {getStatusIcon(task.status)}
            {task.title}
          </h3>
          {task.description && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem', lineHeight: '1.4' }}>
              {task.description}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary" style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onEdit(task)}>
            <Edit2 size={16} />
          </button>
          <button className="btn-secondary" style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }} onClick={() => onDelete(task.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <span style={{ textTransform: 'capitalize' }}>Status: {task.status}</span>
        <span>Priority: {task.priority}/5</span>
      </div>
    </div>
  );
};

export default TaskCard;
