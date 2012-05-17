(function( $ ) {
  $.fn.macho = function (len) {
    len = len || 3;
    var puncs_reg = new RegExp("[-,_\\|<.>/?;:'\"`~!@#$%^&*()（）´・ωつдС；∀ﾟo彡★☆▽￣╮╭ノ╰〒皿～┴‵□′↗︴yΦθ↖，。？！：；＠m＃＄％︿＆＊＝＋艸凸∩＿ˍ▁▂▃▄▅▆█◣◎]+$");

    this.each(function(idx){
      var punc = $(this).html().match(puncs_reg); // faild if end with </em> or </strong>
      if (punc!=null && punc.length > 3) 
        return $(this).html($(this).html().replace(puncs_reg,"<span class='macho'>$&</span>")); // works like continue

      for (l=0;l<len;l++){
        var reg = new RegExp("\\w+\\W{"+l+"}"+punc+"$");
        var res = $(this).html().match(reg);
        // note: does not handle the case that the english string is too short
        if (res!=null) return $(this).html($(this).html().replace(reg,"<span class='macho'>$&</span>"));
      }
      var reg = new RegExp("\\W{"+len+"}"+punc+"$");
      $(this).html($(this).html().replace(reg,"<span class='macho' style='display: inline-block;'>$&</span>"));
    });
  };
})( jQuery );
