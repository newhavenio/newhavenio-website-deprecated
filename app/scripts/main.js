$(function() {
    
  var $grid = $('#grid');
  if ($grid.length > 0) {

    // Initialize element with shuffle plugin
    $grid.shuffle({
      itemSelector: '.brick-item',
      columnWidth: 470
    });
        
    $('.js-shuffle-search').on('keyup change', function() {

      // This is the value for which we're searching 
      var val = this.value.toLowerCase();
     
      // See which elements match
      $grid.shuffle('shuffle', function($el, shuffle) { 
        var text = $.trim( $el.text() ).toLowerCase();
        return text.indexOf(val) !== -1;
      });
    });
    
  };
});