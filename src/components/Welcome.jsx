import React from 'react';
import { useSelector } from 'react-redux';
import Elmala from '../elmala.png'
import './index.css'

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);


  return (
    <section
      class="hero is-fullheight section is-centered "
    //{//style={{ backgroundImage: `url("https://images.unsplash.com/photo-1602211844066-d3bb556e983b?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`, backgroundPosition: 'center' }}}
    >
      <div class="container hero-head  mb-6">
        <div class="columns is-variable is-6 notification is-primary ">
          <div class="column center left">

            <h1 class="title   is-marginless    ">ELMALA DATABASE</h1>


          </div>

          <div class="column center p-6 ">

            <h2 className="title  is-marginless has-text-centered">
              USER{' : '}
              <strong class="title">{user && user.name}</strong>
            </h2>

          </div>



        </div>
        <div className="field mt-5 pb-8">
          <a href="/products">
            <button
              type="submit"
              className="button is-success is-fullwidth"
            >
              Continue
            </button>
          </a>
        </div>



      </div>
    </section>

  );
};

export default Welcome;


