import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css'

export const Loader = () => {
  return (
    <>
      <div className={css.container}>
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    </>
  );
};
