const newsLoadData = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    const newsCategory = data.data.news_category
    newsCategory.forEach(category => {

        const containerTabElementId = document.getElementById('container-tab-id')
        const div = document.createElement('container-tab-id')
        div.innerHTML = `
         <a onclick="newsCategoryItems('${category.category_id}')" role="tab" class="tab">${category.category_name}</a>
        `
        containerTabElementId.appendChild(div)
    });
}


const newsCategoryItems = async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsId}`)
    const data = await res.json()
    const newsDatas = data.data
    // console.log(newsDatas)

    const containerCardElementById = document.getElementById('container-card')
    containerCardElementById.innerHTML = ''

    newsDatas.forEach((newsData) => {
        // console.log(newsData)

        const div = document.createElement('div')
        div.innerHTML = `
 <div class="card  bg-base-100 shadow-xl">
        <figure>
          <img
            src=${newsData?.image_url}
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
           ${newsData.title.slice(0, 40)}
            <div class="badge badge-secondary p-5">${newsData?.rating?.badge}</div>
          </h2>
          <p>
          ${newsData.details.slice(0, 50)}
          </p>
          <h3> totoal viws: ${newsData.total_view ? newsData.total_view : "no vviews"
            }</h3>
          <div class="card-footer flex justify-between mt-8">
            <div class="flex">
              <div>
                <div class="avatar online">
                  <div class="w-14 rounded-full">
                    <img
                      src=${newsData.author?.img}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6>${newsData.author?.name}</h6>
                <small>2022-08-24 17:27:34</small>
              </div>
            </div>
            <div class="card-detaild-btn">
              <button onclick= showDetails('${newsData._id}')
                class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
        
        `;


        containerCardElementById.appendChild(div)
        const modal = document.getElementById('')
    })
}

const showDetails = async (Detailsid) => {
    console.log(Detailsid)

    const res = await fetch(`https://openapi.programming-hero.com/api/news/${Detailsid}`)
    const data = await res.json()
    const datas = data.data[0]
    console.log(datas)


    const containerModal = document.getElementById('container-modal')
    const div = document.createElement('div')
    div.innerHTML = `
    

<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${datas.details}</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    `
    containerModal.appendChild(div)
    const modal = document.getElementById('my_modal_1')
    modal.showModal()
}


newsLoadData()
newsCategoryItems('08')