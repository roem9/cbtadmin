reload_data();

// load data toko 
function reload_data(){
    let result = ajax(url_base+"toko/ajax_list_toko", "POST", "");
    
    html = "";

    if(result.length != 0){
        result.forEach(data => {
            html += `
                <div class="col-12 col-md-4">
                    <div class="card shadow mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">`+data.nama_toko+`</h6>
                            <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated-fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <div class="dropdown-header">Data Toko</div>
                                    <a class="dropdown-item btnEditToko" href="#editToko" data-toggle="modal" data-id="`+data.id_toko+`">Edit</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item btnHapusToko" href="javascript:void(0)" data-id="`+data.id_toko+`|`+data.nama_toko+`">Hapus</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body text-gray-900">
                            <p><i class="fa fa-map-marker-alt mr-4"></i>`+data.alamat+`</p>
                            <p><i class="fa fa-map-signs mr-3"></i>`+data.kecamatan+`</p>
                            <p><i class="fa fa-truck mr-3"></i>`+data.pengiriman+` pengiriman </p>
                            <div class="d-flex justify-content-center mt-1">
                                <a href="#addPengiriman" data-toggle="modal" class="btn btn-circle btn-success mr-1 addPengiriman" data-id="`+data.id_toko+`|`+data.nama_toko+`"><i class="fa fa-truck"></i></a>
                                <a href="`+url_base+`toko/detail/`+data.link_toko+`" class="btn btn-circle btn-info"><i class="fa fa-info"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    } else {
        html += `
            <div class="col-12">
                <div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>data toko kosong</div>
            </div>`
        
    }

    $("#dataAjax").html(html);
}