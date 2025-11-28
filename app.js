// --- 1. SERVICIOS DE DATOS ---

const JobService = {
    _jobs: [
        { 
            id: 1, 
            title: "Auxiliar Administrativo", 
            company: "Walmart El Salvador", 
            location: "San Salvador", 
            salary: "$450", 
            type: "Presencial", 
            match: 98, 
            logoColor: "bg-blue-600",
            longDesc: "Buscamos un auxiliar para apoyar en la gestión de documentación y atención a proveedores en nuestras oficinas centrales. Es una oportunidad perfecta para iniciar tu carrera corporativa en una multinacional.",
            reqs: ["Bachillerato completo", "Manejo básico de Excel", "Disponibilidad de horarios", "Proactividad"]
        },
        { 
            id: 2, 
            title: "Asistente de Diseño", 
            company: "Escuela Mónica Herrera", 
            location: "Santa Tecla", 
            salary: "$500", 
            type: "Medio Tiempo", 
            match: 85, 
            logoColor: "bg-red-600",
            longDesc: "Apoya al equipo de comunicaciones en la creación de piezas gráficas para redes sociales y eventos internos. Ambiente creativo y de aprendizaje constante.",
            reqs: ["Estudiante de Diseño o Comunicaciones", "Portafolio (proyectos U cuentan)", "Manejo de Adobe Suite", "Creatividad"]
        },
        { 
            id: 3, 
            title: "Vendedor de Repuestos", 
            company: "Excel Automotriz", 
            location: "San Miguel", 
            salary: "$400 + Comis.", 
            type: "Presencial", 
            match: 90, 
            logoColor: "bg-slate-800",
            longDesc: "Únete al líder automotriz. Buscamos jóvenes con pasión por los autos y gusto por las ventas para nuestra sucursal en San Miguel.",
            reqs: ["Bachillerato técnico (preferible)", "Licencia de conducir liviana", "Actitud de servicio", "Residir en zona oriental"]
        }
    ],
    getAll: () => Promise.resolve(JobService._jobs),
    getById: (id) => Promise.resolve(JobService._jobs.find(j => j.id === id))
};

// Empresa
const ExternalApiService = {

    _partners: [
        { name: "Walmart El Salvador", type: "Retail", slogan: "Ahorra dinero, vive mejor.", logo: "Imagenes/Logo Walmart.png" },
        { name: "Escuela Mónica Herrera", type: "Educación", slogan: "Diseñando el futuro.", logo: "Imagenes/Logo Monica Herrera.png" },
        { name: "Excel Automotriz", type: "Automotriz", slogan: "Pasión por el movimiento.", logo: "Imagenes/Logo Excel Automotriz.webp" },
        { name: "Teleperformance", type: "BPO", slogan: "Líder global en servicios digitales.", logo: "Imagenes/Logo Teleperformance.png" }
    ],


    getPartners: function() {
        return Promise.resolve(this._partners);
    }
};



const AcademyService = {
    _courses: [
        { id: 1, title: "Tu CV Irresistible", author: "Ana Torres", time: "15 min", url: "https://youtu.be/toYqGCBi1gM?si=3zilIW2S0wkrbbqt" },
        { id: 2, title: "Tips Entrevista", author: "Fernanda M.", time: "20 min", url: "https://youtu.be/enx_eZKckXM?si=Q-xRvb8_vJmnXdmt" },
        { id: 3, title: "LinkedIn Juniors", author: "Roberto P.", time: "10 min", url: "https://youtu.be/u6FFVhD23Pg?si=BZEytqeEDbYbmPJY" }
    ],
    getAll: () => Promise.resolve(AcademyService._courses),
    getById: (id) => Promise.resolve(AcademyService._courses.find(c => c.id === id))
};

// LOCALSTORAGE
const StorageService = {
    KEY: 'chambly_data_v6',
    defaultData: {
        name: "Juan Carlos Juarez",
        headline: "Estudiante de Scrum Master",
        email: "juan@email.com",
        phone: "7000-0000",
        location: "San Salvador",
        bio: "Soy una persona organizada y proactiva, buscando mi primera oportunidad laboral para aplicar mis conocimientos de Scrum Master (guiño)",
        skills: ["Excel Avanzado", "Atención al Cliente", "Inglés Básico"],
        experience: [], 
        education: [
            { school: "Universidad Tecnológica", degree: "Licenciatura (En curso)", date: "2022 - Presente" },
            { school: "Instituto Nacional", degree: "Bachillerato General", date: "2020 - 2021" }
        ]
    },
    get: function() {
        const saved = localStorage.getItem(this.KEY);
        return saved ? JSON.parse(saved) : this.defaultData;
    },
    save: function(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    }
};

// Servicio: API - Random User
const RandomUserService = {
    getRandomUser: function() {
        return fetch('https://randomuser.me/api/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
};

// --- AUTENTICACIÓN (SIMPLIFICADA) ---
const AuthService = {
    KEY: 'chambly_auth_v1',
    defaultAuth: { isLoggedIn: false, user: null },
    get: function() {
        const saved = localStorage.getItem(this.KEY);
        return saved ? JSON.parse(saved) : this.defaultAuth;
    },
    save: function(authObj) {
        localStorage.setItem(this.KEY, JSON.stringify(authObj));
    },
    login: function(email, password) {
        return new Promise((resolve, reject) => {
            // Validación mínima para demo
            if (!email || !password) return reject(new Error('Email y contraseña son requeridos'));
            if (password.length < 3) return reject(new Error('Contraseña muy corta'));

            // Crear usuario demo a partir del email
            const name = email.split('@')[0].replace(/\.|_/g, ' ').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            const user = { name, email };
            const auth = { isLoggedIn: true, user };
            this.save(auth);
            resolve(user);
        });
    },
    logout: function() {
        this.save(this.defaultAuth);
    }
};

// --- UTILIDADES ---
function getYoutubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// --- CONTROLADOR UI ---
const ui = {
    content: document.getElementById('app-content'),
    
    showLoader: function() {
        this.content.innerHTML = `<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-10 w-10 border-b-4 border-lime-500"></div></div>`;
    },

    toggleNotifications: function() {
        const drop = document.getElementById('notification-dropdown');
        const list = document.getElementById('notification-list');
        if(list.innerHTML === "") {
            list.innerHTML = `
                <div class="p-4 border-b hover:bg-slate-50 cursor-pointer group" onclick="app.renderSearch()">
                    <div class="flex gap-3">
                        <div class="w-8 h-8 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center shrink-0"><i data-lucide="briefcase" class="w-4 h-4"></i></div>
                        <div><p class="font-bold text-xs text-slate-900">Nueva vacante Walmart</p><p class="text-xs text-slate-500">Auxiliar coincide contigo.</p></div>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }
        drop.classList.toggle('hidden');
    },

    // MODAL DE DETALLES DEL EMPLEO (POP-UP DE INFORMACIÓN)
    openJobDetails: function(job) {
        const modal = document.getElementById('job-details-modal');
        const content = modal.querySelector('div');
        
        // Llenar datos
        document.getElementById('modal-job-title').innerText = job.title;
        document.getElementById('modal-job-company').innerText = job.company;
        document.getElementById('modal-job-salary').innerText = job.salary;
        document.getElementById('modal-job-type').innerText = job.type;
        document.getElementById('modal-job-location').innerText = job.location;
        document.getElementById('modal-job-desc').innerText = job.longDesc;
        
        // Logo dinámico
        const logoContainer = document.getElementById('modal-job-logo');
        logoContainer.className = `w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-md ${job.logoColor}`;
        logoContainer.innerText = job.company.charAt(0);

        // Lista de requisitos
        const reqList = document.getElementById('modal-job-reqs');
        reqList.innerHTML = job.reqs.map(r => `<li>${r}</li>`).join('');

        // Configurar botón de aplicar para abrir el siguiente modal
        document.getElementById('btn-apply-trigger').onclick = () => {
            ui.closeJobDetails();
            setTimeout(() => ui.openApplicationModal(), 300);
        };

        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }, 10);
    },

    closeJobDetails: function() {
        const modal = document.getElementById('job-details-modal');
        const content = modal.querySelector('div');
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    },

    // MODAL DE FORMULARIO
    openApplicationModal: function() {
        const modal = document.getElementById('application-modal');
        const content = modal.querySelector('div'); 
        const profile = StorageService.get();
        document.getElementById('app-cv-name').innerText = `CV_${profile.name.split(' ')[0]}.pdf`;
        
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            if(content) { 
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }
        }, 10);
    },

    closeApplicationModal: function() {
        const modal = document.getElementById('application-modal');
        const content = modal.querySelector('div');
        modal.classList.add('opacity-0', 'pointer-events-none');
        if(content) {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.classList.add('hidden');
            document.getElementById('app-message').value = '';
        }, 300);
    },

    showSaveSuccess: function() {
        const btn = document.getElementById('btn-save-profile');
        const original = btn.innerHTML;
        btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i> Guardado`;
        btn.classList.remove('bg-slate-900');
        btn.classList.add('bg-green-600');
        lucide.createIcons();
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('bg-green-600');
            btn.classList.add('bg-slate-900');
            lucide.createIcons();
        }, 2000);
    }
};

// --- LÓGICA APP ---
const app = {
    init: function() {
        this.renderHome();
        this.updateHeader();
    },

    updateHeader: function() {
        const auth = AuthService.get();
        const profile = StorageService.get();
        const headerNameEl = document.getElementById('header-username');
        if (!headerNameEl) return;
        const headerHello = document.getElementById('header-hello');
        if (auth.isLoggedIn && auth.user) {
            headerNameEl.innerText = auth.user.name.split(' ')[0];
            if (headerHello) headerHello.style.display = '';
        } else {
            headerNameEl.innerText = 'Iniciar sesión';
            if (headerHello) headerHello.style.display = 'none';
        }
    },

    // --- VISTAS ---

    renderHome: async function() {
        ui.showLoader();
        const jobs = await JobService.getAll();
        const partners = await ExternalApiService.getPartners();

        ui.content.innerHTML = `
            <section class="bg-white pt-20 pb-16 px-4 text-center relative overflow-hidden">
                <div class="absolute top-0 -left-20 w-96 h-96 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div class="absolute top-0 -right-20 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                <div class="relative z-10">
                    <span class="bg-slate-900 text-lime-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block shadow-lg">Plataforma #1 para Juniors</span>
                    <h1 class="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">Tu futuro empieza <br><span class="text-lime-500">sin experiencia</span></h1>
                    <p class="text-lg text-slate-500 max-w-2xl mx-auto mb-10">Conectamos a jóvenes salvadoreños con empresas dispuestas a enseñar.</p>
                    
                    <div class="flex justify-center gap-4 mb-16">
                        <button onclick="app.renderSearch()" class="bg-lime-400 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-lime-500 transition shadow-lg shadow-lime-200/50 flex items-center gap-2">Buscar Chamba <i data-lucide="search" class="w-5"></i></button>
                    </div>

                    <!-- EMPRESAS REALES (API MAPPED) -->
                    <div class="max-w-6xl mx-auto border-t border-slate-100 pt-10">
                        <p class="text-xs font-bold text-slate-400 uppercase mb-8 tracking-widest">Empresas Aliadas</p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                            ${partners.map(p => `
                                <div class="p-6 bg-white/80 backdrop-blur rounded-2xl border border-slate-100 hover:-translate-y-1 transition duration-300 shadow-sm">
                                    <div class="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-xl font-bold text-slate-500 mb-3 mx-auto"><img src="${p.logo}" width="50px"></div>
                                    <p class="font-bold text-slate-900 text-sm truncate">${p.name}</p>
                                    <p class="text-[10px] text-lime-600 font-bold uppercase mt-1">${p.type}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>

            <!-- SECCIÓN EMPLEOS EN HOME -->
            <section class="py-16 bg-slate-50 border-t border-slate-200">
                <div class="max-w-6xl mx-auto px-4">
                    <h2 class="text-3xl font-black text-slate-900 mb-8 text-center">Últimas Vacantes</h2>
                    <div class="grid gap-6 md:grid-cols-3">
                        ${jobs.map(job => `
                            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-lime-400 transition cursor-pointer group flex flex-col justify-between h-full" onclick="ui.openJobDetails(${JSON.stringify(job).replace(/"/g, '&quot;')})">
                                <div>
                                    <div class="flex justify-between items-start mb-4">
                                        <div class="w-12 h-12 ${job.logoColor} rounded-xl flex items-center justify-center text-white font-bold text-xl">${job.company.charAt(0)}</div>
                                        <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase">${job.type}</span>
                                    </div>
                                    <h3 class="font-bold text-lg text-slate-900 mb-1 group-hover:text-lime-600 transition-colors">${job.title}</h3>
                                    <p class="text-sm text-slate-500">${job.company}</p>
                                </div>
                                <div class="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <span class="font-bold text-slate-900">${job.salary}</span>
                                    <span class="text-xs text-lime-600 font-bold flex items-center gap-1">Ver detalles <i data-lucide="arrow-right" class="w-3"></i></span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="text-center mt-10">
                        <button onclick="app.renderSearch()" class="text-slate-500 font-bold hover:text-slate-900 underline decoration-2 decoration-lime-400">Ver todas las ofertas</button>
                    </div>
                </div>
            </section>
        `;
        lucide.createIcons();
    },

    renderSearch: async function(searchTerm = '') {
        ui.showLoader();
        const jobs = await JobService.getAll();
        ui.content.innerHTML = `
            <div class="max-w-5xl mx-auto px-4 py-8 fade-in">
                <div class="flex flex-col md:flex-row justify-between items-end mb-8">
                    <div><h2 class="text-2xl font-black text-slate-900 mb-2">Buscar Chamba</h2><p class="text-slate-500">Encuentra la oportunidad ideal.</p></div>
                    <input class="bg-white border border-slate-200 p-3 rounded-xl w-full md:w-64 outline-none focus:border-lime-400" placeholder="Cargo o empresa...">
                </div>
                <div class="grid gap-4">
                    ${jobs.map(job => `
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-lime-400 transition group flex flex-col md:flex-row items-center gap-6 cursor-pointer" onclick="ui.openJobDetails(${JSON.stringify(job).replace(/"/g, '&quot;')})">
                            <div class="w-14 h-14 ${job.logoColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md">${job.company[0]}</div>
                            <div class="flex-1 text-center md:text-left">
                                <h3 class="font-bold text-lg text-slate-900 group-hover:text-lime-600 transition-colors">${job.title}</h3>
                                <p class="text-sm text-slate-500 mb-2">${job.company} • ${job.location}</p>
                                <span class="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-lg font-bold">${job.salary}</span>
                            </div>
                            <button class="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-700 shadow-lg">Ver Oferta</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        lucide.createIcons();
    },

    renderAcademia: async function() {
        ui.showLoader();
        const courses = await AcademyService.getAll();
        ui.content.innerHTML = `
            <div class="bg-slate-900 text-white py-20 px-4 text-center relative overflow-hidden">
                <div class="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full blur-[150px] opacity-10 animate-blob"></div>
                <h2 class="text-4xl font-black mb-4 relative z-10">Academia Chambly</h2>
                <p class="text-slate-400 text-lg relative z-10">Aprende lo que las universidades no enseñan.</p>
            </div>
            <div class="max-w-6xl mx-auto px-4 -mt-10 grid md:grid-cols-3 gap-8 pb-20 relative z-20">
                ${courses.map(c => {
                    const videoId = getYoutubeId(c.url);
                    const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
                    return `
                    <div onclick="app.renderCourse(${c.id})" class="bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-all cursor-pointer group">
                        <div class="h-48 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden bg-slate-200">
                            <img src="${thumb}" class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                            <div class="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform"><i data-lucide="play" class="w-6 h-6 text-slate-900 ml-1 fill-slate-900"></i></div>
                        </div>
                        <div class="px-2">
                            <h3 class="font-bold text-lg mb-2 group-hover:text-lime-600 transition-colors line-clamp-2">${c.title}</h3>
                            <div class="flex justify-between items-center"><p class="text-xs text-slate-500 font-bold uppercase tracking-wide">Por: ${c.author}</p><span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${c.time}</span></div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        `;
        lucide.createIcons();
    },

    renderCourse: async function(id) {
        ui.showLoader();
        const course = await AcademyService.getById(id);
        const videoId = getYoutubeId(course.url);
        ui.content.innerHTML = `
            <div class="bg-slate-50 min-h-screen p-4 pt-8">
                <div class="max-w-4xl mx-auto">
                    <button onclick="app.renderAcademia()" class="flex items-center text-slate-500 hover:text-slate-900 font-bold mb-6 transition-colors"><i data-lucide="arrow-left" class="w-5 mr-2"></i> Volver a Academia</button>
                    <div class="bg-black rounded-3xl aspect-video mb-8 shadow-2xl overflow-hidden relative">
                        ${videoId ? `<iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/${videoId}?autoplay=1&origin=${window.location.origin}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : `<div class="flex items-center justify-center h-full text-white">Video no disponible</div>`}
                    </div>
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="flex-1"><h1 class="text-3xl md:text-4xl font-black text-slate-900 mb-2">${course.title}</h1><p class="text-slate-500 font-medium mb-6 flex items-center gap-2"><span class="bg-lime-100 text-lime-800 px-2 py-1 rounded text-xs font-bold uppercase">Video</span> Por: ${course.author}</p><div class="prose max-w-none bg-white p-8 rounded-3xl shadow-sm border border-slate-100"><h3 class="font-bold text-lg mb-2">Acerca de esta clase</h3><p class="text-slate-600 leading-relaxed">Este contenido ha sido seleccionado especialmente para potenciar tu perfil junior.</p></div></div>
                        <div class="md:w-80"><div class="bg-slate-900 text-white p-6 rounded-3xl sticky top-24"><h3 class="font-bold text-xl mb-2">¡Aplica lo aprendido!</h3><p class="text-slate-400 text-sm mb-6">No dejes que el conocimiento se enfríe. Mejora tu CV ahora.</p><button onclick="app.renderCVBuilder()" class="w-full bg-lime-400 text-slate-900 py-3 rounded-xl font-bold hover:bg-lime-500 transition">Ir al Creador de CV</button></div></div>
                    </div>
                </div>
            </div>`;
        lucide.createIcons();
        window.scrollTo(0, 0);
    },

    renderCVBuilder: function() {
        // Solo accesible si está autenticado
        const auth = AuthService.get();
        if (!auth.isLoggedIn) {
            return this.renderLogin();
        }
        const profile = StorageService.get();
        
        // HTML Experiencia
        const expHTML = profile.experience.length > 0 ? profile.experience.map((exp, idx) => `
            <div class="mb-6 border-l-4 border-lime-200 pl-6 ml-2 relative group hover:border-lime-400 transition-colors">
                <button onclick="app.deleteExp(${idx})" class="absolute right-0 top-0 text-slate-300 hover:text-red-500 no-print p-1"><i data-lucide="trash-2" class="w-4"></i></button>
                <h4 class="font-bold text-slate-900 text-xl outline-none focus:bg-lime-50 rounded px-1" contenteditable="true" onblur="app.updateExp(${idx}, 'role', this.innerText)">${exp.role}</h4>
                <p class="text-lime-600 font-bold mb-2 outline-none focus:bg-lime-50 rounded px-1 inline-block" contenteditable="true" onblur="app.updateExp(${idx}, 'company', this.innerText)">${exp.company} | ${exp.date}</p>
                <p class="text-slate-600 leading-relaxed outline-none focus:bg-lime-50 rounded p-1 text-sm" contenteditable="true" onblur="app.updateExp(${idx}, 'desc', this.innerText)">${exp.desc}</p>
            </div>`).join('') : '<div class="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">No has agregado experiencia aún.</div>';

        // HTML Educación
        const eduHTML = profile.education.map((edu, idx) => `
            <div class="mb-4 group relative">
                <button onclick="app.deleteEdu(${idx})" class="absolute right-0 top-0 text-slate-300 hover:text-red-500 no-print p-1"><i data-lucide="trash-2" class="w-4"></i></button>
                <div class="flex justify-between items-baseline">
                    <p class="font-bold text-slate-900 text-lg outline-none focus:bg-lime-50" contenteditable="true" onblur="app.updateEdu(${idx}, 'school', this.innerText)">${edu.school}</p>
                    <span class="text-slate-400 text-sm font-bold bg-slate-50 px-2 py-1 rounded outline-none focus:bg-lime-50" contenteditable="true" onblur="app.updateEdu(${idx}, 'date', this.innerText)">${edu.date}</span>
                </div>
                <p class="text-lime-600 font-bold outline-none focus:bg-lime-50" contenteditable="true" onblur="app.updateEdu(${idx}, 'degree', this.innerText)">${edu.degree}</p>
            </div>
        `).join('');

        ui.content.innerHTML = `
            <div class="bg-slate-100 min-h-screen p-4 print:bg-white print:p-0">
                <div class="max-w-4xl mx-auto bg-white shadow-xl p-10 rounded-3xl print:shadow-none">
                    <div class="flex justify-between mb-8 no-print">
                        <button onclick="app.renderHome()" class="text-slate-500 font-bold flex items-center gap-2"><i data-lucide="arrow-left" class="w-4"></i> Salir</button>
                        <!-- BOTON GUARDAR -->
                            <div class="flex gap-2">
                                ${AuthService.get().isLoggedIn ? `<button onclick="app.logout()" class="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition">Cerrar sesión</button>` : ''}
                            <button id="btn-random-user" onclick="app.fetchRandomUser()" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Generar perfil aleatorio</button>
                            <button id="btn-save-profile" onclick="app.forceSave()" class="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-700 shadow-lg">
                                <i data-lucide="save" class="w-4"></i> Guardar Cambios
                            </button>
                            <button onclick="window.print()" class="bg-lime-400 text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-lime-500 shadow-lg">
                                <i data-lucide="printer" class="w-4"></i> PDF
                            </button>
                        </div>
                    </div>

                    <div class="print:p-4">
                        <div class="border-b-4 border-lime-400 pb-6 mb-6 flex items-center gap-6">
                            ${profile.photo ? `<img src="${profile.photo}" alt="Avatar" class="w-20 h-20 rounded-full shadow-lg object-cover">` : ''}
                            <div>
                                <h1 class="text-4xl font-black text-slate-900 uppercase outline-none focus:bg-lime-50 rounded px-2 -ml-2" contenteditable="true" onblur="app.updateField('name', this.innerText)">${profile.name}</h1>
                            <p class="text-xl text-lime-600 font-bold outline-none focus:bg-lime-50 rounded px-2 -ml-2" contenteditable="true" onblur="app.updateField('headline', this.innerText)">${profile.headline}</p>
                            <p class="text-sm text-slate-500 mt-2" contenteditable="true" onblur="app.updateField('email', this.innerText)">${profile.email} | ${profile.phone} | ${profile.location}</p>
                            </div>
                        </div>

                        <div class="mb-8">
                            <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest mb-2 bg-slate-100 p-1 inline-block">Perfil</h3>
                            <p class="text-slate-700 outline-none focus:bg-lime-50 rounded p-2" contenteditable="true" onblur="app.updateField('bio', this.innerText)">${profile.bio}</p>
                        </div>

                        <div class="mb-8">
                            <div class="flex justify-between items-center border-b mb-4 pb-1">
                                <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Experiencia</h3>
                                <button onclick="app.addExp()" class="no-print text-xs bg-lime-100 text-lime-700 px-2 py-1 rounded hover:bg-lime-200 font-bold">+ Agregar</button>
                            </div>
                            <div>${expHTML}</div>
                        </div>

                        <!-- EDUCACIÓN EDITABLE -->
                        <div class="mb-8">
                            <div class="flex justify-between items-center border-b mb-4 pb-1">
                                <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Formación Académica</h3>
                                <button onclick="app.addEdu()" class="no-print text-xs bg-lime-100 text-lime-700 px-2 py-1 rounded hover:bg-lime-200 font-bold">+ Agregar</button>
                            </div>
                            <div>${eduHTML}</div>
                        </div>

                        <div class="mb-8">
                            <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest border-b mb-4 pb-1">Habilidades</h3>
                            <div class="flex flex-wrap gap-2">
                                ${profile.skills.map((s, idx) => `<span onclick="app.deleteSkill(${idx})" class="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-bold text-sm cursor-pointer hover:bg-red-100 hover:text-red-600 transition">${s}</span>`).join('')}
                                <input id="skill-input" placeholder="+ Skill (Enter)" class="no-print border-b border-dashed outline-none text-sm w-32 focus:border-lime-500" onkeypress="app.handleSkill(event)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    },

    renderProfile: function() { 
        const auth = AuthService.get();
        if (!auth.isLoggedIn) return this.renderLogin();
        return this.renderCVBuilder();
    },

    renderLogin: function() {
        ui.showLoader();
        ui.content.innerHTML = `
            <div class="max-w-md mx-auto p-8 mt-12 bg-white rounded-3xl shadow-lg">
                <h2 class="text-2xl font-black text-slate-900 mb-4">Iniciar sesión</h2>
                <p class="text-slate-500 mb-6">Ingresa tu correo y contraseña para acceder a tu perfil.</p>
                <form onsubmit="app.handleLoginSubmit(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold mb-1">Correo</label>
                        <input id="login-email" type="email" required class="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-lime-400" placeholder="nombre@ejemplo.com">
                    </div>
                    <div>
                        <label class="block text-xs font-bold mb-1">Contraseña</label>
                        <input id="login-password" type="password" required class="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-lime-400" placeholder="Contraseña">
                    </div>
                    <div class="flex gap-2 items-center">
                        <button type="submit" class="bg-lime-400 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-lime-500">Entrar</button>
                        <button type="button" onclick="app.renderHome()" class="text-slate-500 px-4 py-2 rounded-lg hover:bg-slate-50">Cancelar</button>
                    </div>
                    <p class="text-xs text-slate-400">Demo: acepta cualquier correo, contraseña mínima 3 caracteres.</p>
                </form>
            </div>
        `;
    },

    handleLoginSubmit: function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = 'Entrando...'; }
        AuthService.login(email, password)
            .then(user => {
                // Sincronizar el perfil guardado con el usuario autenticado (demo)
                const p = StorageService.get();
                p.name = user.name;
                p.email = user.email;
                StorageService.save(p);
                this.updateHeader();
                this.renderCVBuilder();
                alert('Has iniciado sesión como ' + user.name);
            })
            .catch(err => this.mostrarError(err.message || 'No se pudo iniciar sesión'))
            .finally(() => { if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = 'Entrar'; } });
    },

    logout: function() {
        AuthService.logout();
        this.updateHeader();
        this.renderHome();
        alert('Has cerrado sesión');
    },

    // Consumes la API Random User y actualiza el perfil local
    fetchRandomUser: function() {
        const btn = document.getElementById('btn-random-user');
        if (btn) { btn.disabled = true; btn.innerText = 'Cargando...'; }
        RandomUserService.getRandomUser()
            .then(data => this.mostrarRandomUser(data))
            .catch(error => this.mostrarError('No se pudieron cargar los datos'))
            .finally(() => { if (btn) { btn.disabled = false; btn.innerText = 'Generar perfil aleatorio'; } });
    },

    mostrarRandomUser: function(data) {
        if (!data || !data.results || data.results.length === 0) return this.mostrarError('Usuario no encontrado');
        const u = data.results[0];
        const name = `${u.name.first} ${u.name.last}`;
        const updated = StorageService.get();
        updated.name = name;
        updated.email = u.email || updated.email;
        updated.phone = u.phone || updated.phone;
        updated.location = `${u.location.city}, ${u.location.country}` || updated.location;
    
        updated.photo = u.picture?.large || updated.photo || '';
        StorageService.save(updated);
        
        this.renderCVBuilder();
    },

    mostrarError: function(message) {
        console.error('Error:', message);
        alert(message);
    },

    // MANEJO DATOS
    updateField: function(field, value) { const p = StorageService.get(); p[field] = value; StorageService.save(p); this.updateHeader(); },
    forceSave: function() { ui.showSaveSuccess(); }, // Visual feedback
    handleSkill: function(e) { if(e.key === 'Enter' && e.target.value) { const p = StorageService.get(); p.skills.push(e.target.value); StorageService.save(p); this.renderCVBuilder(); setTimeout(() => document.getElementById('skill-input').focus(), 50); } },
    deleteSkill: function(idx) { const p = StorageService.get(); p.skills.splice(idx, 1); StorageService.save(p); this.renderCVBuilder(); },
    
    // EXPERIENCIA
    addExp: function() { const p = StorageService.get(); p.experience.push({ role: "Nuevo Cargo", company: "Empresa", date: "Fecha", desc: "Descripción..." }); StorageService.save(p); this.renderCVBuilder(); },
    deleteExp: function(idx) { if(confirm("¿Borrar?")) { const p = StorageService.get(); p.experience.splice(idx, 1); StorageService.save(p); this.renderCVBuilder(); } },
    updateExp: function(idx, field, val) { const p = StorageService.get(); p.experience[idx][field] = val; StorageService.save(p); },

    // EDUCACIÓN (NUEVO)
    addEdu: function() { const p = StorageService.get(); p.education.push({ school: "Nueva Institución", degree: "Título", date: "Año" }); StorageService.save(p); this.renderCVBuilder(); },
    deleteEdu: function(idx) { if(confirm("¿Borrar?")) { const p = StorageService.get(); p.education.splice(idx, 1); StorageService.save(p); this.renderCVBuilder(); } },
    updateEdu: function(idx, field, val) { const p = StorageService.get(); p.education[idx][field] = val; StorageService.save(p); },

    handleApplicationSubmit: function(e) {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = "ENVIANDO...";
        setTimeout(() => {
            ui.closeApplicationModal();
            alert("¡Postulación enviada con éxito!");
            btn.innerText = "ENVIAR";
        }, 1500);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());

// Compatibilidad con la muestra del usuario
function mostrarDatos(data) { app.mostrarRandomUser(data); }
function mostrarError(message) { app.mostrarError(message); }
