document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/catalog'){
        const filterContainer = document.getElementById('filter_header_container')
        const filterMenu = document.getElementById('filter_menu')
        const icon = filterContainer.querySelector('.filter_icon_btn')

        filterContainer.addEventListener('click', function () {
            if (window.innerWidth <= 800) {
                filterMenu.classList.toggle('filter_open')

                if (filterMenu.classList.contains('filter_open')) {
                    icon.classList.remove('down')
                    icon.classList.add('up')
                } else {
                    icon.classList.remove('up')
                    icon.classList.add('down')
                }
            }
        })
    }
})