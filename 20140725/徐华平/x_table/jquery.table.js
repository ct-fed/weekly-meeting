/*
 *@Version:	    v1.0(2014-07-04)
 *@Author:      xuhp
 *@email:       xuhp@ct108.com
 *@Description: 
 * 1. 表格的创建
 * 2. 表格的布局
 * 3. 表格功能
 */
 ;(function($){
     $.fn.table = function (options) {
         //获取键值
         var keys = get_key(options.column),
             $this = this,
             opts = $.extend(true,{}, create_defaults(keys), options);
         //创建table及相关事件注册
         var table = {
             init: function (data, keys) {
                 //向页面中添加表格
                 $this.append(this._create_header(data, keys), this._create_con(data, keys));
                 this._set_color();
                 this._register_event(data, keys);
                 this._layout_table();

             },
             //创建表格头部
             _create_header: function (data, keys) {
                 var table_header = '<div class="table_header_wrap">' +
                     '<table class="table_header">' +
                         '<thead>';
                 for (var i = 0; i < data.column_num; i++) {
                     table_header += '<th>' + data.column[keys[i]].title + '</th>';
                 }
                 table_header += '</thead>' +
                     '</table>' +
                   '</div>';
                 return table_header;
             },
             //创建表格内容部分
             _create_con: function (data, keys) {
                 var table_con = '<div class="table_con_wrap self_adaption_height ' + data.skin + '" style="overflow-y:scroll;">' +
                     '<table class="table_con">' +
                         '<tbody>';
                 for (var i = 0, len = data.row.length; i < len; i++) {
                     table_con += '<tr>';
                     for (var j = 0; j < data.column_num; j++) {
                         table_con += '<td>' + data.row[i].values[keys[j]] + '</td>';
                     }
                     table_con += '</tr>';
                 }
                 table_con += '</tbody></table></div>';
                 return table_con;
             },
             //设置表格颜色
             _set_color: function () {
                 $('.dark_skin tr:odd').css("background", "#454545");
                 $('.dark_skin tr:even').css("background", "#4d4d4d");
                 $('.little_skin tr:odd').css("background", "#F6F4F4");
                 $('.little_skin tr:even').css("background", "#fff");
             },
             //表格布局
             _layout_table: function () {
                 var $table_wrap = $this,
 				    $table_header_wrap = $table_wrap.children('.table_header_wrap'),
 				    $table_con_wrap = $table_wrap.children('.table_con_wrap'),
 				    $table_con = $table_con_wrap.children('.table_con');
                 $(window).bind('resize', function () {
                     //设置table_header宽度,针对出现滚动条的情况
                     var diff = $table_con_wrap.outerWidth(true) - $table_con.outerWidth(true);
                     $table_header_wrap.css('padding-right', diff);
                 }).trigger('resize');
             },
             //注册事件
             _register_event: function (data, keys) {
                 var $table_header = $('.table_header'),
                     $table_con = $('.table_con'),
                     $th = $table_header.find('th'),
                     $trs = $table_con.find('tr');
                 //循环出每一列
                 for (var i = 0; i < data.column_num; i++) {
                     var this_column_data = data.column[keys[i]],
                         this_column_keys = get_key(this_column_data),
                         $this_th = $($th[i]);
                     this_column_keys.forEach(function (e) {
                         switch (e) {
                             case 'width':
                                 $this_th.css('width', this_column_data.width);
                                 for (var j = 0, row_len = $trs.length; j < row_len; j++) {
                                     $($($trs[j]).children('td')[i]).css('width', this_column_data.width);
                                 }
                                 break;
                             case 'sort':
                                 if (this_column_data.sort) {
                                     $this_th.addClass('trigger_sort');
                                 }
                                 break;
                             case 'filter':
                                 if (this_column_data.filter) {
                                     $this_th.addClass('trigger_filter');
                                 }
                         }
                     })

                 }
             }
         }
         //改变选中行颜色
         $this.delegate('.table_con tr', 'click', function () {
             $(this).addClass('tr_on')
                .siblings('tr').removeClass('tr_on');
         })
         //创建默认值
         function create_defaults(keys) {
             var keys_len = keys.length;
             var defaults = {
                 'column': {
                 },
                 'row': null,
                 'column_num': keys_len,
                 'skin':'little_skin'
             };
             //添加列默认值
             for (var i = 0; i < keys_len; i++) {
                 defaults.column[keys[i]] = {
                     'index': i,
                     'title': '名称',
                     'width': '',
                     'sort': false,
                     'filter': false
                 }
             }
             return defaults;
         };
         //获取key
         function get_key(data) {
             var keys = [];
             for (var key in data) {
                 keys.push(key);
             }
             return keys;
         };
         //隔行变色
         function tr_color() {
             $table_tbody.find("tr:odd").css("background", "#fafafa");
             $table_tbody.find("tr:even").css("background", "#fff");
         };
         //初始化表格
         table.init(opts, keys);
     };

 })(jQuery);
 