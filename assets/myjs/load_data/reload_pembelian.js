var page = "";
        
// Detect pagination click
$('#pagination').on('click','a',function(e){
    e.preventDefault(); 
    var pageno = $(this).attr('data-ci-pagination-page');
    loadPagination(pageno);

    page = pageno;
});

loadPagination(0);

// Load pagination
function loadPagination(pagno){
    let result = ajax(url_base+"pembelian/loadRecord/"+pagno, "POST", "");

    if(result.total_rows != 0) {
        
        if(result.result.length != 0){
            
            $('#pagination').html(result.pagination);
            createTable(result.result,result.row);

        } else {
            
            pageback = pagno - 1;
            let result = ajax(url_base+"pembelian/loadRecord/"+pageback, "POST", "");

            if(result.result.length != 0){
            
                $('#pagination').html(result.pagination);
                createTable(result.result,result.row);

            } else {
                
                pagenext = pagno + 1;
                let result = ajax(url_base+"pembelian/loadRecord/"+pagnext, "POST", "");

                if(result.result.length != 0){
                
                    $('#pagination').html(result.pagination);
                    createTable(result.result,result.row);

                } else {
                    
                    html = `<div class="col-12"><div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>Data pembelian kosong</div></div>`
                    $("#dataAjax").html(html);
                
                }

            }

        }

    } else {
        html = `<div class="col-12"><div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>Data pembelian kosong</div></div>`
        $("#dataAjax").html(html);

    }
    
}

// Create table list
function createTable(data,sno){

    sno = Number(sno);

    html = "";

    for(index in data){

        html += `
        <div class="col-12 col-md-4">
            <div class="card shadow mb-4">
                <div class="list-group-item-success card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-dark"><i class="fa fa-calendar mr-1"></i>`+data[index].tgl_pembelian+`</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Pembelian</div>
                            <a class="dropdown-item btnDetailPembelian" href="#detailPembelian" data-id="`+data[index].id_pembelian+`" data-toggle="modal">Detail</a>
                            <a class="dropdown-item btnEditPembelian" href="#editPembelian" data-toggle="modal" data-id="`+data[index].id_pembelian+`">Edit</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item bthHapusPembelian" href="javascript:void(0)" data-id="`+data[index].id_pembelian+`">Hapus</a>
                        </div>
                    </div>
                </div>
                <div class="card-body text-gray-900">
                    <p><i class="fa fa-dollar-sign mr-3"></i>`+data[index].harga_total+`</p>
                </div>
            </div>
        </div>`;
    }

    $("#dataAjax").html(html);

};