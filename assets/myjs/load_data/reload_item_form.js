load_item(id);

function load_item(id){
    let data = {id_form: id};

    let result = ajax(url_base+"form/get_all_item", "POST", data);

    console.log(result);

    html = ""
    // result = 1;
    if(result.item.length != 0) {
        result.item.forEach(data => {

            if(data.required == 1) required = "required";
            else required = "0";

            item = "";
            if(data.type == "Teks"){
                item = `
                    <div class="form-floating mb-3">
                        <input type="text" name="`+data.label+`" class="form-control `+required+`">
                        <label>`+data.label+`</label>
                    </div>`
            } else if(data.type == "Select"){
                item = `
                    <div class="form-floating mb-3">
                        <input type="text" name="`+data.label+`" class="form-control `+required+`">
                        <label>`+data.label+`</label>
                    </div>`
            }

            html += `
            <div class="OrderingField">
                <div class="card mb-3">
                    <div class="card-body">

                        <input type="hidden" name="id" value="`+data.id+`">
                        
                        `+item+`
    
                    </div>
                    <div class="RightFloat Commands d-flex justify-content-between mb-3">
                        <div>
                        </div>
                        <div>
                            <button value='up' class="btn btn-sm btn-success me-3">
                                <svg width="24" height="24">
                                    <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-arrow-big-top" />
                                </svg>
                            </button>
                            <button value='down' class="btn btn-sm btn-success">
                                <svg width="24" height="24">
                                    <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-arrow-big-down" />
                                </svg> 
                            </button>
                        </div>
                        <div class="me-3">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                <svg width="24" height="24">
                                    <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-settings" />
                                </svg>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item editItem" href="#editItem" data-bs-toggle="modal" data-id="`+data.id+`">Edit</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item hapusItem" href="javascript:void(0)" data-id="`+data.id+`">Hapus</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

        })

    } else {
        html = `
        <div class="d-flex flex-column justify-content-center">
            <div class="empty">
                <div class="empty-img"><img src="`+url_base+`assets/static/illustrations/undraw_printing_invoices_5r4r.svg" height="128"  alt="">
                </div>
                <p class="empty-title">Data kosong</p>
                <p class="empty-subtitle text-muted">
                    Silahkan tambahkan data
                </p>
            </div>
        </div>`;

    }

    $("#dataAjax").html(html);
}
