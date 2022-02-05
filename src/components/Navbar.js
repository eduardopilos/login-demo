import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

function Navbar() {
  const [atualiza, setAtualiza] = useState(false);
  useEffect(() => { }, [atualiza])
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState(false);
  const [password, setPassword] = useState(false);

  const entra = () => {
    if (user === 'edu' && password === '123') {
      localStorage.setItem('user', user);
      setAtualiza(!atualiza);
      setShow(false);
    }
  }

  const sai = () => {
    localStorage.setItem('user', '');
    setAtualiza(!atualiza);
  }
  console.log(localStorage)
  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <IconContext.Provider value={{ color: '#000' }}>
            <FaIcons.FaBars onClick={showSidebar} />
          </IconContext.Provider>
        </Link>
        {localStorage.user === 'edu' ?
          <><h4 style={{ float: 'right', marginRight: '15px' }}>Bem vindo, {localStorage.user}</h4><Button variant={'outline-dark'} style={{ float: 'right', marginRight: '15px' }} onClick={sai}><AiIcons.AiOutlineClose /> Sair </Button></> :
          <Button variant={'outline-dark'} style={{ float: 'right', marginRight: '15px' }} onClick={handleShow}><AiIcons.AiOutlineUser /> Login </Button>
        }

      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <IconContext.Provider value={{ color: '#000' }}>
                <AiIcons.AiOutlineClose />
              </IconContext.Provider>
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Insira suas informações de login</p>
          <hr />
          <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
            <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setUser(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Senha">
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </FloatingLabel>
          <hr />
          <Button variant="link" style={{ float: 'left' }}>Esqueci minha senha</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose} style={{ float: 'left' }}>
            Fechar
          </Button>
          <Button variant="outline-primary" onClick={entra}>
            Entrar
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default Navbar;
