/*
 *@Version:	    v1.0(2014-07-11)
 *@Author:      xuhp
 *@email:       xuhp@ct108.com
 *@Description: 
 * 自动计算页面元素的宽度和高度，进行布局
 * 注意：当在页面当中添加元素之后，需要重新调用该函数
 */
var adaption_w_h = function () {
    $(window).resize(function () {
        window_resize.init();
    }).trigger('resize');
}

var window_resize = {
    init: function () {
        var elems_arr = this._get_all_elem().sort(compare);

        //this._adaption(elems_arr);

        //确保执行resize完成之后在计算高度，防止出错
        var cur_envi = this;
        setTimeout(function () {
            cur_envi._adaption(elems_arr);
        }, 1);
    },

    //获取所有元素,并标注层级
    _get_all_elem: function () {
        var elems_arr = [],
            class_arr = ['self_adaption_height', 'self_adaption_width', 'inherit_parent_height', 'inherit_parent_width'],
            cur_obj = {},
            cur_envi = this;
        for (var i = 0, len = class_arr.length; i < len; i++) {
            $('.' + class_arr[i]).each(function (index, elem) {
                cur_obj = {
                    'elem': $(elem),
                    'type': class_arr[i],
                    'level': cur_envi._get_level($(elem))
                }
                elems_arr.push(cur_obj);
            });
        }
        return elems_arr;
    },
    //获取层级
    _get_level: function (elem) {
        var level = 0,
        parent = $(elem).parent();
        while (parent[0].tagName != 'BODY') {
            level++;
            parent = $(parent).parent();
        }
        return level;
    },
    //对不同的元素进行相关的操作
    _adaption: function (elems_arr) {
        for (var i = 0, len = elems_arr.length; i < len; i++) {
            switch (elems_arr[i].type) {
                case 'self_adaption_height':
                    this._self_adaption_height(elems_arr[i].elem[0]);
                    break;
                case 'self_adaption_width':
                    this._self_adaption_width(elems_arr[i].elem[0]);
                    break;
                case 'inherit_parent_height':
                    this._inherit_parent_height(elems_arr[i].elem[0]);
                    break;
                case 'inherit_parent_width':
                    this._inherit_parent_width(elems_arr[i].elem[0]);
            }
        }
    },
    _self_adaption_height: function (item) {
        var p = $(item).parent();
        var amountHeight = p.height();
        var eles = p.children();
        for (var i = 0; i < eles.length; i++) {
            var element = eles[i];
            if (element.nodeName != "SCRIPT" && element.nodeName != "LINK" && element.outerHTML != item.outerHTML) {
                amountHeight -= $(element).outerHeight(true);
            }
        }
        $(item).outerHeight(amountHeight);
    },
    _self_adaption_width: function (item) {
        var p = $(item).parent();
        var amountWidth = p.width();
        var eles = p.children();
        for (var i = 0; i < eles.length; i++) {
            var element = eles[i];
            if (element.nodeName != "SCRIPT" && element.nodeName != "LINK" && element.outerHTML != item.outerHTML) {
                amountWidth -= $(element).outerWidth(true);
            }
        }
        $(item).outerWidth(amountWidth);
    },
    _inherit_parent_height: function (item) {
        var p = $(item).parent();
        var amountHeight = p.height();
        $(item).outerHeight(amountHeight);
    },
    _inherit_parent_width: function (item) {
        var p = $(item).parent();
        var amountWidth = p.width();
        $(item).outerWidth(amountWidth);
    }


}
//根据level进行排序
function compare(a, b) {
    return a.level - b.level;
}

