$(document).on('click', '#expand_all', function () {
    for (var x = 1; $('#brk_' + x + ' #tblcnt' + x + ' #data' + x).length == 1; x++) {
        $('#brk_' + x + ' #tblcnt' + x + ' #data' + x).fancytree("getRootNode").visit(function (node) {

            node.setExpanded(true);

            var $tdList = $(node.tr).find(">td");
            if (node.isFolder()) {
                var tot_no_colmn = $tdList.length;
                var l = 0;
                for (var n = 0; n < tot_no_colmn; n++) {
                    if (l == 1) {
                        l++;
                        $tdList.eq(l).text(""); //.css("display","table-cell");
                    } else {
                        $tdList.eq(l).text(""); //.css("display","table-cell");
                    }
                    l++;
                }
            }
            var req_colmn = [],
                hde_colmn = [];
            var tot_no_colmn = $tdList.length;
            var req_no_colmn = $tdList.length - 2;

            for (var m = 1; m <= tot_Layer_cnt; m++) {
                req_colmn.push(tot_no_colmn - m);
            }

            if (req_no_colmn != req_colmn.length) {
                for (var m = 1; m <= req_no_colmn; m++) {
                    if ((tot_no_colmn - m != req_colmn[m - 1]))
                        hde_colmn.push(tot_no_colmn - m);
                }
            }

            if (tot_no_colmn == 6) {
                wdth = 380;
                bfr_wdth = 380;
            } else if (tot_no_colmn == 5) {
                wdth = 480;
                bfr_wdth = 480;
            }

            if (hde_colmn.length != 0) {
                for (var y = hde_colmn.length - 1; y >= 0; y--) {
                    wdth += 100;
                    $('table[id=data' + x + '] thead th[class=th' + (hde_colmn[y] + 1) + ']').css("display", "none");
                    $tdList.eq(hde_colmn[y]).css("display", "none");
                }
            }

            for (var y = req_colmn.length - 1; y >= 0; y--) {
                $('table[id=data' + x + '] thead th[class=th' + (req_colmn[y] + 1) + ']').css("display", "table-cell");
                $tdList.eq(req_colmn[y]).css("display", "table-cell");
            }
            $('table[id=data' + x + '] thead th[class=th2]').css({
                "width": "" + wdth + "px"
            });
            wdth_arr["data" + x] = {
                wd: wdth
            };
            //wdth_arr["data"+x] = wdth;
            $("table[id=data" + x + "] tbody tr[id=data" + x + "_" + $(node.tr).index() + "] td span[id=fancytree-node_data" + x + "_" + $(node.tr).index() + "] span.fancytree-expander").attr("id", "fancytree-expander_data" + x + "_" + $(node.tr).index());
            $("table[id=data" + x + "] tbody tr[id=data" + x + "_" + $(node.tr).index() + "] td span[id=fancytree-node_data" + x + "_" + $(node.tr).index() + "] span.fancytree-expander").attr("trid", "data" + x + "_" + $(node.tr).index());
        });
    }
    $(this).attr("id", "collapse_all");
    $(this).attr("name", "collapse");
    $(this).attr("value", "Collapse All");
    node_stat_arry = new Object();
});

$(document).on('click', '#collapse_all', function () {
    for (var x = 1; $('#brk_' + x + ' #tblcnt' + x + ' #data' + x).length == 1; x++) {
        $('#brk_' + x + ' #tblcnt' + x + ' #data' + x).fancytree("getRootNode").visit(function (node) {

            node.setExpanded(false);

            var $tdList = $(node.tr).find(">td");

            if (node.isFolder()) {
                var tData = node.key.split("~");
                var tot_no_colmn = $tdList.length;
                var l = 0;
                for (var n = 0;
                    (n < tot_no_colmn); n++) {
                    // render the node title into the 2nd column
                    if (l == 1) {
                        l++;
                    }
                    // other column
                    $tdList.eq(l).text(tData[n]).addClass("ri");
                    l++;
                }
            }
            var req_colmn = [],
                hde_colmn = [];
            var tot_no_colmn = $tdList.length;
            var req_no_colmn = $tdList.length - 2;

            for (var m = 1; m <= 1; m++) {
                req_colmn.push(tot_no_colmn - m);
            }

            if (req_no_colmn != req_colmn.length) {
                for (var m = 1; m <= req_no_colmn; m++) {
                    if ((tot_no_colmn - m != req_colmn[m - 1]))
                        hde_colmn.push(tot_no_colmn - m);
                }
            }

            if (tot_no_colmn == 6) {
                wdth = 380;
            } else if (tot_no_colmn == 5) {
                wdth = 480;
            }
            if (hde_colmn.length != 0) {
                for (var y = hde_colmn.length - 1; y >= 0; y--) {
                    wdth += 100;
                    $('table[id=data' + x + '] thead th[class=th' + (hde_colmn[y] + 1) + ']').css("display", "none");
                    $tdList.eq(hde_colmn[y]).css("display", "none");
                }
            }

            for (var y = req_colmn.length - 1; y >= 0; y--) {
                $('table[id=data' + x + '] thead th[class=th' + (req_colmn[y] + 1) + ']').css("display", "table-cell");
                $tdList.eq(req_colmn[y]).css("display", "table-cell");
            }
            $('table[id=data' + x + '] thead th[class=th2]').css({
                "width": "" + wdth + "px"
            });
            wdth_arr["data" + x] = {
                wd: wdth
            };
            //wdth_arr["data"+x] = [wdth];

            $("table[id=data" + x + "] tbody tr[id=data" + x + "_" + $(node.tr).index() + "] td span[id=fancytree-node_data" + x + "_" + $(node.tr).index() + "] span.fancytree-expander").attr("id", "fancytree-expander_data" + x + "_" + $(node.tr).index());
            $("table[id=data" + x + "] tbody tr[id=data" + x + "_" + $(node.tr).index() + "] td span[id=fancytree-node_data" + x + "_" + $(node.tr).index() + "] span.fancytree-expander").attr("trid", "data" + x + "_" + $(node.tr).index());
        });
    }
    $(this).attr("id", "expand_all");
    $(this).attr("name", "expand");
    $(this).attr("value", "Expand All");
    node_stat_arry = new Object();
});

$(document).on('click', ".fancytree-expander", function () {
    var span_id = this.id;
    var row_id = "";
    row_id = $(this).attr("trid");
    var tmpstr = row_id.split('_');
    var tab_id = tmpstr[0];
    var row_idx = tmpstr[1];
    var span_title = $("tr[id=" + row_id + "]").attr("title");
    var slct_node = '',
        slct_node_lvl = '',
        slct_node_stat = '',
        slct_stat_cnt = 0,
        slct_node_hier = 0;
    var higherLvl = 0,
        higr_node_stat = false,
        higr_slct_ncnt = 0,
        higr_Lvl_node = '';
    var nodeLevel = '';
    var node_arry = new Object();
    var tot_prnt_layers = 0;
    var $tdList_clr = '';
    var aData_clr = '';
    var tot_no_colmn = 0;
    $("table[id=" + tab_id + "]").fancytree("getRootNode").visit(function (node) {
        var $row_id = $(node.tr).attr("id");
        $row_id = $row_id.split("_");
        var $row_idx = $row_id[1];
        if ((span_title == node.title) && ($row_idx == row_idx)) {
            slct_node = node;
            slct_node_lvl = node.getLevel();
            $tdList_clr = $(slct_node.tr).find(">td");
            aData_clr = slct_node.key.split("~");
            tot_no_colmn = $tdList_clr.length;
            if (slct_node.isFolder()) {
                slct_node_stat = node.isExpanded();
                slct_node_hier = node.getIndexHier();
            }
        }

        if (node.isFolder()) {
            node_arry["level"] = node.getLevel();
            node_arry["expand"] = node.isExpanded();

            node_stat_arry[node.getIndexHier()] = node_arry;
            node_arry = new Object();
        }
        if (node.getLevel() == 1)
            tot_prnt_layers++;
    });
    var trc_path_expand = [];
    var trc_path_collapse = [];
    for (var c = 1; c <= tot_prnt_layers; c++) {
        if (node_stat_arry[c]["expand"]) {
            if (trc_path_expand == [])
                trc_path_expand = c;
            else
                trc_path_expand.push(c);
        } else {
            if (trc_path_collapse == [])
                trc_path_collapse = c;
            else
                trc_path_collapse.push(c);
        }
    }

    var cnt_expnd = 0;
    for (var c = 0; c < trc_path_expand.length; c++) {
        var cnt_expnd = 0;
        $("table[id=" + tab_id + "]").fancytree("getRootNode").visit(function (node) {

            if (node.isFolder()) {
                if (node.getIndexHier().indexOf(".") != -1) {
                    if (node.getIndexHier().split(".")[0] == trc_path_expand[c]) {
                        if (slct_node.getIndexHier().split(".")[0] == node.getIndexHier().split(".")[0]) {
                            if (slct_node.getIndexHier().split(".").length < node.getIndexHier().split(".").length) {

                                node.setExpanded(false)
                                var l = 0;
                                for (var n = 0;
                                    (n < tot_no_colmn); n++) {
                                    // render the node title into the 2nd column
                                    if (l == 1) {
                                        l++;
                                    }
                                    $(node.tr).find(">td").eq(l).text(node.key.split('~')[n]).addClass("ri");
                                    l++;
                                }
                                node_stat_arry[node.getIndexHier()]["expand"] = false;
                            }
                        }
                        if (node_stat_arry[node.getIndexHier()]["expand"]) {
                            if (node.getLevel() > higherLvl) {
                                higr_node_stat = node.isExpanded();
                                higherLvl = node.getLevel();
                                higr_Lvl_node = node;
                            }

                            if (node.getLevel() == higherLvl) {
                                higr_slct_ncnt++;
                            }


                        } else {

                        }

                    }
                } else {
                    if (node_stat_arry[node.getIndexHier()]["expand"]) {
                        if (node.getLevel() > higherLvl) {
                            higr_node_stat = node.isExpanded();
                            higherLvl = node.getLevel();
                            higr_Lvl_node = node;
                        }

                        if (node.getLevel() == higherLvl) {
                            higr_slct_ncnt++;
                        }
                    }
                }
            }

        });

    }

    if (slct_node_stat) { // Expand
        //var node = data.node,
        var l = 0;
        for (var n = 0; n < tot_no_colmn; n++) {
            if (l == 1) {
                l++;
                $tdList_clr.eq(l).text(""); //.css("display","table-cell");
            } else {
                $tdList_clr.eq(l).text(""); //.css("display","table-cell");
            }
            l++;
        }

        if (slct_node_lvl < higherLvl) {
            nodeLevel = higherLvl + 1;
        } else {
            nodeLevel = slct_node_lvl + 1;
        }
    } else { //Collapse
        var l = 0;
        for (var n = 0;
            (n < tot_no_colmn); n++) {
            // render the node title into the 2nd column
            if (l == 1) {
                l++;
            }
            // other column
            $tdList_clr.eq(l).text(aData_clr[n]).addClass("ri");
            l++;
        }

        if (slct_node_lvl <= higherLvl) {
            nodeLevel = higherLvl + 1;
        } else {
            nodeLevel = slct_node_lvl;
        }

    }

    var $tdList = $(slct_node.tr).find(">td");

    var req_colmn = [],
        hde_colmn = [];
    var tot_no_colmn = $tdList.length;
    var req_no_colmn = $tdList.length - 2;


    for (var m = 1; m <= nodeLevel; m++) {
        req_colmn.push(tot_no_colmn - m);
    }

    if (req_no_colmn != req_colmn.length) {
        for (var m = 1; m <= req_no_colmn; m++) {
            if ((tot_no_colmn - m != req_colmn[m - 1]))
                hde_colmn.push(tot_no_colmn - m);
        }
    }

    var $tdList = "";
    $("table[id=" + tab_id + "]").fancytree("getRootNode").visit(function (node) {
        $tdList = $(node.tr).find(">td");

        if (tot_no_colmn == 6) {
            wdth = 380;
        } else if (tot_no_colmn == 5) {
            wdth = 480;
        }
        if (hde_colmn.length != 0) {
            for (var y = hde_colmn.length - 1; y >= 0; y--) {
                wdth += 100;
                $('table[id=' + tab_id + '] thead th[class=th' + (hde_colmn[y] + 1) + ']').css("display", "none");
                $tdList.eq(hde_colmn[y]).css("display", "none");
            }
        }

        for (var y = req_colmn.length - 1; y >= 0; y--) {
            $('table[id=' + tab_id + '] thead th[class=th' + (req_colmn[y] + 1) + ']').css("display", "table-cell");
            $tdList.eq(req_colmn[y]).css("display", "table-cell");
        }
        $('table[id=' + tab_id + '] thead th[class=th2]').css({
            "width": "" + wdth + "px"
        });
        wdth_arr[tab_id] = {
            wd: wdth
        };
    });

    $("table[id=" + tab_id + "] tbody tr[id=" + row_id + "] td span[id=fancytree-node_" + row_id + "] span.fancytree-expander").attr("id", span_id);
    $("table[id=" + tab_id + "] tbody tr[id=" + row_id + "] td span[id=fancytree-node_" + row_id + "] span.fancytree-expander").attr("trid", row_id);
});
function tree_creation(strt_cnt, tbl_cnt) {
    //console.log(tbldata)
    //function logEvent(event, data, msg){
    ////        var args = $.isArray(args) ? args.join(", ") :
    //msg = msg ? ": " + msg : "";
    //$.ui.fancytree.info("Event('" + event.type + "', node=" + data.node + ")" + msg);
    //}
    var cmpny_data = {
        url: ["./forstmann.json", "./pimco.json"]
    };
    for (var x = strt_cnt; x <= tbl_cnt; x++) {
        var i = 0;
        var json_data = "";
        $.get(cmpny_data.url[x-1],function(data){
            json_data = data;
            tot_calc(json_data);
            print_data(json_data, 2);
            // console.log(json_data);
            // console.log(JSON.parse(json_data));
        });
        $('#brk_' + x + ' #tblcnt' + x + ' #data' + x).fancytree({
            extensions: ["glyph", "table"],
            checkbox: true,
            icons: true,
            glyph: {
                preset: "material",
                map: {}
            },
            clickFolderMode: 1,
            table: {
                indentation: 20, // indent 20px per node level
                nodeColumnIdx: 1 // render the node title into the 2nd column
            },
            // source: JSON.parse($("#" + tbldata + x).text()),
            // source: json_data,
            // source: JSON.parse(json_data),
            source:{
                url: cmpny_data.url[x-1]
            },
            renderColumns: function (event, data) {
                i++;
                var node = data.node,
                    $tdList = $(node.tr).find(">td");
                var aData = node.key.split("~");


                //for(var m = 0; m < node.getLevel();m++){
                var l = 0;
                for (var n = 0;
                    (n < aData.length); n++) {

                    if (l == 1) {
                        l++;
                        //$tdList.eq(l).text(aData[n]).addClass("ri"); //.css("display","table-cell");
                        //***************************************************//
                        //				PDF Css include later
                        //***************************************************//
                        //            page-break-before: avoid;
                        //***************************************************//
                        //***************************************************//

                    } //else{
                    $tdList.eq(l).text(aData[n]).addClass("ri"); //.css("display","table-cell");
                    //}
                    l++;
                }
                //}

            },
            expand: function (event, data) {

            },
            collapse: function (event, data) {

            },
            loadError: function (event, data) {
                //logEvent(event, data);
            }

        });
        ////console.log("count 1"+x)
        var $tab_id = $('#brk_' + x + ' #tblcnt' + x + ' #data' + x).attr("id");
        render_row($tab_id);

    }
    // $("#expand_all").click();
    // $("#collapse_all").click();

}

function render_row(tab_id) {
    $("table[id=" + tab_id + "]").fancytree("getRootNode").visit(function (node) {
        node.setExpanded(true);
    });
    var $tab_id = tab_id;
    var $tab_tr = $("#" + $tab_id + " tbody").find(">tr");
    var $tab_td = $tab_tr.find(">td");

    $.each($tab_tr, function () { // Visits every single <td> element
        $(this).attr("id", $tab_id + "_" + $(this).index());
        $("tr[id=" + $tab_id + "_" + $(this).index() + "] td span.fancytree-node").attr("id", "fancytree-node_" + $tab_id + "_" + $(this).index());
        $("tr[id=" + $tab_id + "_" + $(this).index() + "] td span[id=fancytree-node_" + $tab_id + "_" + $(this).index() + "] span.fancytree-expander").attr("id", "fancytree-expander_" + $tab_id + "_" + $(this).index());
        $("tr[id=" + $tab_id + "_" + $(this).index() + "] td span[id=fancytree-node_" + $tab_id + "_" + $(this).index() + "] span.fancytree-expander").attr("trid", $tab_id + "_" + $(this).index());
        var span_title = $("tr[id=" + $tab_id + "_" + $(this).index() + "] td span[id=fancytree-node_" + $tab_id + "_" + $(this).index() + "] span.fancytree-title").text();
        $(this).attr("title", span_title);
    });
}
function tot_calc(json_data) {
    var mgr_total = 0,
        ac_total = 0;
    var cnt = 0;

    for (var t = 0; t < json_data.length; t++) {
        //  Managers and Company Total Calculation
        //  Portfolio's Market Value is '?' totla will calculated as zero
        //  And also zero Market value Portfolos Differentiate From above case .
        //  @ param json_data.key1 is use to remember the zero Market Value Portfolios.
        //  @ param json_data.key1 and json_data.key has ('') NULL value represents the un Calcualted Totals of the Layer (Ex. Manager , Company and Investors Total)
        //  These param key and key1 are use also the grand total calculation function print_data()
        if (json_data[t].folder != false) {

            tot_calc(json_data[t].children);
            if (json_data[t].children[json_data[t].children.length - 1] !== 0) {
                if (isNaN(json_data[t].children[json_data[t].children.length - 1].key)) {
                    ac_total += 0;
                    json_data[t].key = '?';
                } else {
                    json_data[t].key = Number(json_data[t].children[json_data[t].children.length - 1].key);
                    json_data[t].key1 = (json_data[t].children[json_data[t].children.length - 1].key >= 0) ? json_data[t].children[json_data[t].children.length - 1].key : '';
                    ac_total += Number(json_data[t].children[json_data[t].children.length - 1].key);
                }
            }
            if (t == json_data.length - 2) {
                if (ac_total == 0) {
                    json_data[t].key = '?';
                } else {
                    json_data[t + 1].key1 = (json_data[t].key >= 0) ? json_data[t + 1].key : '';
                    json_data[t + 1].key = ac_total;
                }
            }
        } else {
            if (isNaN(json_data[t].key)) {
                mgr_total += 0;
                json_data[t].key = '?';
            } else {
                mgr_total += Number(json_data[t].key);
                if (t == json_data.length - 1) {
                    if (mgr_total == 0) {
                        // json_data[t].key = '?'
                    } else {
                        json_data[t].key = mgr_total;
                        json_data[t].key1 = (json_data[t].key >= 0) ? json_data[t].key : '';
                    }
                    mgr_total = 0;
                }
            }
        }
    }
}

function print_data(json_data, layer_cnt) {
    tild = "~";

    if (json_data.length > 0) {
        layer_cnt++;
    }
    if (tot_Layer_cnt < layer_cnt) {
        tot_Layer_cnt = layer_cnt;
    }

    for (var t = 0; t < json_data.length; t++) {

        if (json_data[t].folder != false) {

            print_data(json_data[t].children, layer_cnt);

            var suffix_tild = "",
                prefix_tild = "";
            for (var j = 0; j < tot_Layer_cnt - 1; j++) {

                if (j < layer_cnt - 1) {
                    suffix_tild += tild;
                } else {
                    prefix_tild += tild;
                }

            }
            if (layer_cnt == 1) {
                if (isNaN(json_data[t].key)) {
                    grand_total += 0;
                } else {
                    grand_total += Number(json_data[t].key);
                }
                if (graph == 'y') {
                    lgnd_val["desc"] = json_data[t].title;
                    lgnd_val["vl"] = json_data[t].key;
                }
            }
            if (isNaN(json_data[t].key) || json_data[t].key1 == '') {
                json_data[t].key = tild + prefix_tild + "?" + suffix_tild;
            } else {
                var mVal = Number(json_data[t].key);
                mVal = Math.round(mVal);
                json_data[t].key = tild + prefix_tild + "" + formatCurrencyGen(mVal, CURRCOMMA).split(".")[0] + suffix_tild;
            }

        } else if (json_data[t].folder == false) {

            var suffix_tild = "",
                prefix_tild = "";
            for (var j = 0; j < tot_Layer_cnt; j++) {
                if (t == json_data.length - 1) {
                    if (j == 0) {
                        layer_cnt--;
                    }
                } else {
                    if (j == 0) {
                        cli_cnt++;
                        prefix_tild += (cli_cnt + "");
                    }
                }
                if (j < layer_cnt - 1) {
                    suffix_tild += tild;
                } else {
                    prefix_tild += tild;
                }
            }
            if (isNaN(json_data[t].key) || json_data[t].key1 == '') {
                json_data[t].key = prefix_tild + "?" + suffix_tild;
            } else {
                var mVal = Number(json_data[t].key);
                mVal = Math.round(mVal);
                json_data[t].key = prefix_tild + "" + formatCurrencyGen(mVal, CURRCOMMA).split(".")[0] + suffix_tild;
            }
        }
    }
}
var tot_Layer_cnt = 0,
    tbl_cnt = 0;
var cli_cnt = 0,
    grand_total = 0,
    cmpny_grand_total = 0,
    layer_cnt = 0;
tree_creation(1,2);

// $.contextMenu({
//     selector: "#tree span.fancytree-title",
//     items: {
//         "cut": {
//             name: "Cut",
//             icon: "cut",
//             callback: function (key, opt) {
//                 var node = $.ui.fancytree.getNode(opt.$trigger);
//                 alert("Clicked on " + key + " on " + node);
//             }
//         },
//         "copy": {
//             name: "Copy",
//             icon: "copy"
//         },
//         "paste": {
//             name: "Paste",
//             icon: "paste",
//             disabled: false
//         },
//         "sep1": "----",
//         "edit": {
//             name: "Edit",
//             icon: "edit",
//             disabled: true
//         },
//         "delete": {
//             name: "Delete",
//             icon: "delete",
//             disabled: true
//         },
//         "more": {
//             name: "More",
//             items: {
//                 "sub1": {
//                     name: "Sub 1"
//                 },
//                 "sub1": {
//                     name: "Sub 2"
//                 }
//             }
//         }
//     },
//     callback: function (itemKey, opt) {
//         var node = $.ui.fancytree.getNode(opt.$trigger);
//         alert("select " + itemKey + " on " + node);
//     }
// });


//   document.addEventListener('DOMContentLoaded', function () {
//       var elems = document.querySelectorAll('.sidenav');
//       var instances = Materialize.Sidenav.init(elems, options);
//   });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

//   $(document).ready(function () {
//       $('.sidenav').sidenav();
//   });

$(document).ready(function () {
    $(".slide-toggle").click(function () {
        $(".side-nav.fixed").animate({
            width: "toggle"
        });
        // $(".container").animate({
        //     left: "180px"
        // });
        var slide_cntrl = $(".slide-toggle i");
        var slide_cntrl_val = slide_cntrl.text();
        if (slide_cntrl_val.indexOf("first") != -1 ){
            slide_cntrl.text("last_page");
        }else{
            slide_cntrl.text("first_page");
        }

    });
    
});