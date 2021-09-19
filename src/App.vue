<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item ><router-link to="/">Home</router-link></b-nav-item>
          <b-nav-item ><router-link to="/01_Scene">1. Scene</router-link></b-nav-item>
          <b-nav-item-dropdown text="2. Camera" right>
            <b-dropdown-item href="#"><router-link to="/02.1_Camera">Camera Types</router-link> </b-dropdown-item>
            <b-dropdown-item href="#"><router-link to="/02.2_CameraCollisions">Cameras, Mesh Collisions, and Gravity</router-link> </b-dropdown-item>
            <b-dropdown-item href="#"><router-link to="/02.3_MultiView">Multiviews & Layer Masks</router-link> </b-dropdown-item>
            <b-dropdown-item href="#"><router-link to="/02.4_CameraInputs">Customizing Camera Inputs</router-link> </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="3. Light" right>
            <b-dropdown-item href="#"><router-link to="/03.1_Light">Light Types</router-link> </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="4. GUI and 2D Layer" right>
            <b-dropdown-item href="#"><router-link to="/04.1_GUI">Advanced Dynamic Texture</router-link> </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#ul {
  text-align: left;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
