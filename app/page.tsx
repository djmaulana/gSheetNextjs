'use client'
import { MessageForm } from '@/components';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className='text-center'>
      <h1>Submit your message</h1>
      <MessageForm />
    </div>
  );
};

export default Home;
