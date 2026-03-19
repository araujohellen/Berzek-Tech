/*
    =========================================================
    MENU MOBILE
    =========================================================

    O que este bloco faz:
    - Localiza o botão do menu mobile.
    - Localiza a lista de links da navegação.
    - Abre e fecha o menu ao clicar no botão.
    - Atualiza o atributo aria-expanded para acessibilidade.

    Manutenção:
    - Se a classe do botão ou da lista mudar no HTML, atualize aqui:
      .nav_toggle
      .nav_list
    - A classe usada para mostrar o menu aberto é: is-open
*/
const navToggle = document.querySelector(".nav_toggle");
const navMenu = document.querySelector(".nav_list");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("is-open");

        const expanded = navMenu.classList.contains("is-open");
        navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    /*
        Quando o usuário clica em um link do menu mobile,
        o menu é fechado automaticamente para melhorar a usabilidade.
    */
    navMenu.querySelectorAll(".nav_link").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/*
    =========================================================
    ANO AUTOMATICO NO RODAPE
    =========================================================

    O que este bloco faz:
    - Localiza o elemento com id #year no footer.
    - Insere automaticamente o ano atual.

    Vantagem:
    - Evita ter que atualizar manualmente o rodapé todo ano.
*/
const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}

/*
    =========================================================
    HEADER DINAMICO AO ROLAR A PAGINA
    =========================================================

    O que este bloco faz:
    - Adiciona a classe is-scrolled quando a página desce um pouco.
    - Esconde o header ao rolar para baixo.
    - Mostra o header novamente ao rolar para cima.

    Classes CSS envolvidas:
    - is-scrolled
    - is-hidden

    Manutenção:
    - Se quiser deixar o menu sempre visível, remova a parte de is-hidden.
    - Se quiser que o efeito comece antes ou depois, altere os números:
      24  => momento em que ativa visual de header rolado
      90  => região inicial onde ele nunca se esconde
*/
const header = document.querySelector(".header");
let lastScrollY = window.scrollY;

function handleHeaderScroll() {
    if (!header) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > 24) {
        header.classList.add("is-scrolled");
    } else {
        header.classList.remove("is-scrolled");
    }

    if (currentScrollY <= 90) {
        header.classList.remove("is-hidden");
        lastScrollY = currentScrollY;
        return;
    }

    if (currentScrollY > lastScrollY) {
        header.classList.add("is-hidden");
    }

    if (currentScrollY < lastScrollY) {
        header.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
}

/*
    Aplica o comportamento do header:
    - durante a rolagem
    - e também ao carregar a página
*/
window.addEventListener("scroll", handleHeaderScroll, { passive: true });
window.addEventListener("load", handleHeaderScroll);

/*
    =========================================================
    ROLAGEM SUAVE PARA LINKS INTERNOS
    =========================================================

    O que este bloco faz:
    - Intercepta links que começam com "#"
    - Calcula a posição da seção alvo
    - Faz a rolagem suave compensando a altura do header fixo

    Manutenção:
    - headerHeight = 88 foi definido com base no header atual.
    - Se a altura visual do menu mudar muito no CSS, ajuste esse valor.
    - Esse código só deve agir em links internos válidos.
*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const headerHeight = 88;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight - 8);

        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });
    });
});
