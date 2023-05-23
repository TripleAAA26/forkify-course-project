import View from './View.js'
import icons from 'url:../../img/icons.svg' // parcel 2
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')
      if (!btn) return

      const goToPage = +btn.dataset.goto

      handler(goToPage)
    })
  }

  _generateMarkup() {
    const curPage = this._data.page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )

    // Page 1, and thera are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, numPages)
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, numPages)
    }

    // Other page
    if (curPage < numPages) {
      return this._generateMarkupButton(curPage, numPages)
    }

    // Page 1, and thera are NO other pages
    return ''
  }

  _generateMarkupButton(curPage, numPages) {
    const prev = `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `
    const next = `
       <button data-goto="${
         curPage + 1
       }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `
    if (curPage === numPages && numPages > 1) return prev
    if (curPage === 1 && numPages > 1) return next
    if (curPage < numPages) return `${prev}${next}`
  }
}

export default new PaginationView()
