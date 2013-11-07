$(function() {
    
    var $grid = $('#grid');
    $sizer = $grid.find('.shuffle__sizer');

    $grid.shuffle({
      itemSelector: '.brick-item',
      columnWidth: 470
    });
    
    
    $('.js-shuffle-search').on('keyup change', function() {
    
    var val = this.value.toLowerCase();
   
    $grid.shuffle('shuffle', function($el, shuffle) { 
      var text = $.trim( $el.find('span.name').text() ).toLowerCase();
      return text.indexOf(val) !== -1;
    });
  });
});