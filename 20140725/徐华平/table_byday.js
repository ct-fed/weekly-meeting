/*
 *@Version:	    v1.0(2014-07-15)
 *@Author:      xuhp
 *@email:       xuhp@ct108.com
 *@Description: 
 * 多日数据表格展示
 */
//表格展示
function table_show_byday(data) {
    //显示表格
    //表格参数配置
    var table_data = {
        'column': {
            'Date': {
                'index': 0,
                'title': '日期',
                'width': '15%',
                'sort': false,
                'filter': false,
            },
            'Users1d1': {
                'index': 1,
                'title': '日登录人数',
                'width': '15%',
                'sort': false,
                'filter': true
            },
            'Times': {
                'index': 2,
                'title': '日登录人次',
                'width': '15%',
                'sort': false,
                'filter': true
            },
            'Users7d1': {
                'index': 3,
                'title': '7天登录1次的用户数',
                'width': '15%',
                'sort': false,
                'filter': true
            },
            'Users21d1': {
                'index': 4,
                'title': '21天登录1次的用户数',
                'width': '15%',
                'sort': false,
                'filter': true
            },
            'Users21d2': {
                'index':5,
                'title': '21天登录2次的用户数',
                'width': '15%',
                'sort': false,
                'filter': true
            }
        },
        'row': '',
        'column_num':6
    }
    var row_data = get_table_data(data, get_key(table_data));
    table_data.row = row_data;
    $('.wrap_table').table(table_data);
    return table_data;
}
function get_key(data) {
    var key_arr = []
    for (var key in data.column) {
        key_arr.push(key);
    }
    return key_arr;
}