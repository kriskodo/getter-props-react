import { useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && (fn(...args)))

const useDialog = () => {
  const [isOpened, setIsOpened] = useState(false);

  const setDialogOpened = (isOpened) => setIsOpened(isOpened);

  const getDialogProps = ({ onClose, ...rest } = {}) => {
    return {
      'aria-label': 'dialog',
      onClose: callAll(onClose, () => setIsOpened(false)),
      ...rest,
    };
  };

  return {
    isOpened,
    setDialogOpened,
    getDialogProps,
  };
};

const MyDialog = ({ children, ...getDialogProps }) => {
  return (
    getDialogProps.isOpened &&
    createPortal(
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,1)',
          transition: 'all .3s ease-in-out',
          color: 'black',
          zIndex: '9999',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <button onClick={() => getDialogProps.onClose(false)}>Close</button>
        </div>
        <div>{children}</div>
      </div>,
      document.body
    )
  );
};

function App() {
  const { isOpened, setDialogOpened, getDialogProps } = useDialog();

  return (
    <div>
      <button onClick={() => setDialogOpened(true)}>Agree</button>
      <MyDialog
        {...getDialogProps({ onClose: () => console.log('additional func to closing'), isOpened })}
      >
        <h2>This is my Dialog content</h2>
        <p>Maybe agree to some stuff</p>
      </MyDialog>
    </div>
  );
}

export default App;
