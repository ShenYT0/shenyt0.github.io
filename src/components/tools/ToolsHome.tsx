import { Link } from 'react-router-dom';
import { tools } from '../../data/tools';

export function ToolsHome() {
  return (
    <div className="tools-page">
      <div className="container">
        <h1 className="section-title">Tools</h1>
        <p className="tools-subtitle">Useful little utilities and mini-apps.</p>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link key={tool.id} to={tool.path} className="tool-card">
              <span className="tool-card-icon">{tool.icon}</span>
              <h2 className="tool-card-title">{tool.title}</h2>
              <p className="tool-card-desc">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}