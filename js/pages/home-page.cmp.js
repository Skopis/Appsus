export default {
    name: 'home-page',
    template: `
    <section class="home-page">
    <div class="hero">
        <!-- <div class="images-container">
            <div class="profile-img"><img src="https://ca.slack-edge.com/T01FLU17LTC-U01HHR0MNPR-98663c8ba16b-512" alt=""></div> 
            <div class="profile-img"><img src="https://ca.slack-edge.com/T01FLU17LTC-U01FJ1LQY6R-6e45df534775-512" alt=""></div> 
        </div> -->
        <div class="hero-inner-container">
            <h1>Welcome to Appsus</h1>
            <h3>Purchase from our <span>Book Shop</span></h3>
            <h3>Manage your <span>Email</span></h3>
            <h3>Write <span>notes</span>  </h3>
            <router-link to="/about">
                 <button>About Us</button>
            </router-link>
        </div>
    </div>

    </section>
    `
}