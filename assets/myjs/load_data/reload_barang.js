reload_data();

// untuk meload data barang
function reload_data(){
    let result = ajax(url_base+"barang/ajax_list_barang", "POST", "");
    
    html = "";

    if(result.length != 0){
        result.forEach(data => {
            html += `
            <div class="col-12 col-md-4">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">`+data.nama_barang+`</h6>
                        <div class="dropdown no-arrow">
                            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink">
                                <div class="dropdown-header">Data Barang</div>
                                <a class="dropdown-item btnEditBarang" href="#editBarang" data-toggle="modal" data-id="`+data.id_barang+`">Edit</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item btnHapusBarang" href="javascript:void(0)" data-id="`+data.id_barang+`|`+data.nama_barang+`">Hapus</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body text-gray-900">
                        <p><i class="fa fa-id-card mr-3"></i> `+data.kode_barang+`</p>
                        <p><i class="fa fa-calendar-alt mr-3"></i> `+data.tgl_rilis+`</p>
                        <p><i class="fa fa-dollar-sign mr-4"></i> `+data.harga+`</p>
                        <p><i class="fa fa-handshake mr-3"></i> `+data.bagi_hasil+`</p>
                    </div>
                </div>
            </div>`
        });
    } else {
        html += `
            <div class="col-12">
                <div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>data barang kosong</div>
            </div>`
        
    }

    $("#dataAjax").html(html);
}