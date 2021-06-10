
var url = window.location.href;
var id_tes = url.substring(url.indexOf("hasil/") + 6);

if(tipe == "TOEFL" || tipe == "TOAFL"){
    var datatable = $('#dataTable').DataTable({ 
        initComplete: function() {
            var api = this.api();
            $('#mytable_filter input')
                .off('.DT')
                .on('input.DT', function() {
                    api.search(this.value).draw();
            });
        },
        oLanguage: {
        sProcessing: "loading..."
        },
        processing: true,
        serverSide: true,
        ajax: {"url": url_base+"tes/loadHasil/"+tipe+"/"+id_tes, "type": "POST"},
        columns: [
            {"data": "nama", render : function(data, row, iDisplayIndex){
                return `
                    <a href='#uploadGambar' class='uploadGambar' data-bs-toggle='modal' data-id='`+iDisplayIndex.id+`'><span class='avatar avatar-sm' style='background-image: url(`+url_base+`assets/foto/`+iDisplayIndex.file+`?t=`+Math.random()+`)'></span></a>`
            }},
            {"data": "nama"},
            {"data": "nilai_listening", render : function (data) {
                if(jQuery.browser.mobile == true) return data
                else return "<center>"+data+"</center>"
            }},
            {"data": "nilai_structure", render : function (data) {
                if(jQuery.browser.mobile == true) return data
                else return "<center>"+data+"</center>"
            }},
            {"data": "nilai_reading", render : function (data) {
                if(jQuery.browser.mobile == true) return data
                else return "<center>"+data+"</center>"
            }},
            {"data": "skor", render : function (data) {
                if(jQuery.browser.mobile == true) return data
                else return "<center>"+data+"</center>"
            }},
            {"data": "sertifikat", render : function(data, row, iDisplayIndex){
                if(data == "") return `<a href="#addSertifikat" data-bs-toggle="modal" class="btn btn-success addSertifikat" data-id="`+iDisplayIndex.id+`"> `+icon("me-1", "award")+` add</a>`;
                else return `<a href="#editSertifikat" data-bs-toggle="modal" class="btn btn-success editSertifikat" data-id="`+iDisplayIndex.id+`"> `+icon("me-1", "award")+` `+data+`</a>`;
            }},
            {"data": "polosan", render : function(data, row, iDisplayIndex){
                if(jQuery.browser.mobile == true) {
                    if(iDisplayIndex.sertifikat == "" || iDisplayIndex.sertifikat == "Soft File") return `-`;
                    else return data
                } else {
                    if(iDisplayIndex.sertifikat == "" || iDisplayIndex.sertifikat == "Soft File") return `<center>-</center>`;
                    else return `<center>`+data+`</center>`;
                }
            }},
            {"data": "full", render : function(data, row, iDisplayIndex){
                if(jQuery.browser.mobile == true) {
                    if(iDisplayIndex.sertifikat == "") return `-`;
                    else return data
                } else {
                    if(iDisplayIndex.sertifikat == "") return `<center>-</center>`;
                    else return `<center>`+data+`</center>`;
                }
            }},
            {"data": "action", render : function (data) {
                if(jQuery.browser.mobile == true) return data
                else return "<center>"+data+"</center>"
            }},
        ],
        order: [[1, 'desc']],
        rowCallback: function(row, data, iDisplayIndex) {
            var info = this.fnPagingInfo();
            var page = info.iPage;
            var length = info.iLength;
            $('td:eq(0)', row).html();
        },
        "columnDefs": [
        { "searchable": false, "targets": "" },  // Disable search on first and last columns
        { "targets": [0, 5, 7, 8, 9], "orderable": false},
        ],
        "rowReorder": {
            "selector": 'td:nth-child(0)'
        },
        "responsive": true,
    });
} else {
    var datatable = $('#dataTable').DataTable({ 
        initComplete: function() {
            var api = this.api();
            $('#mytable_filter input')
                .off('.DT')
                .on('input.DT', function() {
                    api.search(this.value).draw();
            });
        },
        oLanguage: {
        sProcessing: "loading..."
        },
        processing: true,
        serverSide: true,
        ajax: {"url": url_base+"tes/loadHasil/"+tipe+"/"+id_tes, "type": "POST"},
        columns: [
            {"data": "nama"},
            {"data": "email"},
            {"data": "nilai", render : function (data) {
                if(jQuery.browser.mobile == true) return data
                else return "<center>"+data+"</center>"
            }},
            {"data": "skor", render : function (data) {
                if(jQuery.browser.mobile == true) return data
                else return "<center>"+data+"</center>"
            }},
        ],
        order: [[1, 'desc']],
        rowCallback: function(row, data, iDisplayIndex) {
            var info = this.fnPagingInfo();
            var page = info.iPage;
            var length = info.iLength;
            $('td:eq(0)', row).html();
        },
        "columnDefs": [
        { "searchable": false, "targets": "" },  // Disable search on first and last columns
        { "targets": [3], "orderable": false},
        ],
        "rowReorder": {
            "selector": 'td:nth-child(0)'
        },
        "responsive": true,
    });
}