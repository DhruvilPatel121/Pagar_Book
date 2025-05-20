import React, { useState } from 'react';
import { componentStyles } from '../../../theme';

const TasksOverview = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const ds = componentStyles.geoPage.dashboard;

  const taskData = [
    { id: 'total', label: 'Total Tasks', value: 2, percentage: 100 },
    { id: 'notStarted', label: 'Not yet Started', value: 0, percentage: 0 },
    { id: 'delayed', label: 'Delayed Tasks', value: 0, percentage: 0 },
    { id: 'inProgress', label: 'In progress', value: 0, percentage: 0 },
    { id: 'completed', label: 'Completed Tasks', value: 2, percentage: 100 },
  ];

  return (
    <div className={`col-span-2 ${ds.card}`}>
      <h2 className={ds.cardTitle}>Tasks Overview</h2>
      
      <div className={ds.progressContainer}>
        {taskData.map((task) => (
          <div 
            key={task.id} 
            className={ds.progressRow}
            onMouseEnter={() => {
              setActiveTooltip({
                id: task.id,
                label: task.label,
                value: task.value
              });
              setHoveredTask(task.id);
            }}
            onMouseLeave={() => {
              setActiveTooltip(null);
              setHoveredTask(null);
            }}
          >
            <span className={ds.progressLabel}>{task.label}</span>
            <span className={ds.progressValue}>{task.value}</span>
            <div className={ds.progressBarContainer}>
              <div 
                className={ds.progressFill} 
                style={{ 
                  width: `${task.percentage}%`,
                  opacity: hoveredTask === task.id ? '0.8' : '1',
                  transform: hoveredTask === task.id ? 'scaleY(1.05)' : 'scaleY(1)',
                  transition: 'all 0.2s ease'
                }}
              ></div>
              
              {activeTooltip && activeTooltip.id === task.id && (
                <div className={ds.tooltip.container}>
                  {task.label}: {task.value}
                  <div className={ds.tooltip.arrow}></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksOverview;