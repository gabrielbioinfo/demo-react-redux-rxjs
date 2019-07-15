import React, { Component } from 'react';
import './style.scss';

class AppError extends Component {
    render() {
        return (
            <div className="app-error flex h10 colored center-content">
                <div className="header">Erro ao buscar dados da Disciplina</div>
            </div>
        );
    }
}
export default AppError;
