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

        $('.ui.checkbox').checkbox()

        const searching = document.getElementById('searchDataJSON')
        
        if (searching) {
            const searchContent = JSON.parse(searching.textContent)

            $('.ui.search').search({
                source: searchContent,
                searchFields: ['title'],
                showNoResults: false

            })

            function manSearch() {
                const query = $('#catalogSearch').val().toLowerCase().trim()
                if (!query) return;

                const match = searchContent.find(item => item.title.toLowerCase().includes(query))

                if (match) {
                    window.location.href = match.url
                } else {
                    window.location.href = '/catalog'
                }
            }
            $('#catalogSearch').on('submit', function(e) {
                e.preventDefault()
                manSearch()
            })
        }
    }
})