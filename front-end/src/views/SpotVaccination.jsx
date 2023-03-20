export default function SpotVaccination() {
    return (
        <main>
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">First Vaccination</h1>
        </div>
    </header>

    <div class="container mb-5">

        <div class="section-header mb-4">
            <h4 class="section-title text-muted font-weight-normal">List Vaccination Spots in Central Jakarta</h4>
        </div>

        <div class="section-body">

            <article class="spot">
                <div class="row">
                    <div class="col-5">
                        <h5 class="text-primary">Usamah Hospital</h5>
                        <span class="text-muted">Ds. Abdullah No. 31, DKI Jakarta</span>
                    </div>
                    <div class="col-4">
                        <h5>Available vaccines</h5>
                        <span class="text-muted">Sinovac, Moderna, Pfizer.</span>
                    </div>
                    <div class="col-3">
                        <h5>Serve</h5>
                        <span class="text-muted">
                        Only first vaccination
                    </span>
                    </div>
                </div>
            </article>

            <article class="spot unavailable">
                <div class="row">
                    <div class="col-5">
                        <h5 class="text-primary">Nasyidah Hospital</h5>
                        <span class="text-muted">Ki. Bakau Griya Utama No. 476, DKI Jakarta</span>
                    </div>
                    <div class="col-4">
                        <h5>Available vaccines</h5>
                        <span class="text-muted">Sinovac, AstraZeneca, Moderna, Pfizer.</span>
                    </div>
                    <div class="col-3">
                        <h5>Serve</h5>
                        <span class="text-muted">
                        Only second vaccination
                    </span>
                    </div>
                </div>
            </article>

            <article class="spot">
                <div class="row">
                    <div class="col-5">
                        <h5 class="text-primary">Napitupulu Hospital</h5>
                        <span class="text-muted">Jln. Laswi No. 228, DKI Jakarta</span>
                    </div>
                    <div class="col-4">
                        <h5>Available vaccines</h5>
                        <span class="text-muted">Sinovac, AstraZeneca, Sinnopharm.</span>
                    </div>
                    <div class="col-3">
                        <h5>Serve</h5>
                        <span class="text-muted">
                        Both vaccination
                    </span>
                    </div>
                </div>
            </article>

            <article class="spot">
                <div class="row">
                    <div class="col-5">
                        <h5 class="text-primary">Nugroho Hospital</h5>
                        <span class="text-muted">Ki. Bagis Utama No. 325, DKI Jakarta</span>
                    </div>
                    <div class="col-4">
                        <h5>Available vaccines</h5>
                        <span class="text-muted">Sinovac, AstraZeneca, Sinnopharm.</span>
                    </div>
                    <div class="col-3">
                        <h5>Serve</h5>
                        <span class="text-muted">
                        Only first vaccination
                    </span>
                    </div>
                </div>
            </article>

            <article class="spot">
                <div class="row">
                    <div class="col-5">
                        <h5 class="text-primary">Megantara Hospital</h5>
                        <span class="text-muted">Gg. Sam Ratulangi No. 503, DKI Jakarta</span>
                    </div>
                    <div class="col-4">
                        <h5>Available vaccines</h5>
                        <span class="text-muted">Sinovac, AstraZeneca, Sinnopharm.</span>
                    </div>
                    <div class="col-3">
                        <h5>Serve</h5>
                        <span class="text-muted">
                        Only first vaccination
                    </span>
                    </div>
                </div>
            </article>

        </div>

    </div>

</main>
    )
}