(function($) {
    tinymce.PluginManager.add('blockquote', function(editor, url) {

        var checkFormatMatch = function(alignment, ctrl) {

            // Check if the selection matches the format
            var formatMatch = editor.formatter.match('cc_blockquote_format');
            
            // Some magic to find the blockquote element from inside the selection
            var $selectedElement = $(editor.selection.getNode());

            if ($selectedElement.is('blockquote')) {
                $blockquote = $selectedElement;
            } else {
                $blockquote = $selectedElement.closest('blockquote');
            }

            var alignmentMatch = $blockquote.hasClass('cc-blockquote-' + alignment);
            var borderElementMatch = $blockquote.find('.cc-blockquote-border').length;
            var imageElementMatch = $blockquote.hasClass('cc-blockquote-image');

            // If all conditions are true, the button should be in its active state
            ctrl.active( formatMatch && alignmentMatch && (borderElementMatch || imageElementMatch) );
                
        };

        var toggleBlockquoteFormat = function(alignment) {

            if (!editor.formatter.match('cc_blockquote_format')) {

                // If the blockquote format is not already applied to the element, we apply it before doing anything else.
                editor.formatter.apply('cc_blockquote_format');

                // Some magic to find the blockquote element from inside the selection
                var $selectedElement = $(editor.selection.getNode());

                if ($selectedElement.is('blockquote')) {
                    $blockquote = $selectedElement;
                } else {
                    $blockquote = $selectedElement.closest('blockquote');
                }

                $blockquote.addClass('cc-blockquote-' + alignment);

                var $img = $blockquote.find('img');
                if ($img.length) {
                    $blockquote.addClass('cc-blockquote-image');
                } else {
                    $blockquote.addClass('cc-blockquote-text');

                    // Check whether or not we already have a .cc-blockquote-border in the selection, in case the style was toggled off using the regular blockquote btn
                    if (!$blockquote.find('.cc-blockquote-border').length) {
                        $borderElement = $('<span>&nbsp;</span>').addClass('cc-blockquote-border');
                        $blockquote.children().last().append($borderElement);
                    }
                }

            } else {

                // First we find the parent <blockquote> element
                var $selectedElement = $(editor.selection.getNode());
                var $blockquote = $selectedElement.closest('.cc-blockquote');

                // Since the format is already applied, we remove the border element from inside the blockquote
                $blockquote.find('span.cc-blockquote-border').remove();

                // We also have to manually remove all classes that are not part of the formatter
                $blockquote.removeClass('cc-blockquote-text cc-blockquote-image cc-blockquote-' + alignment);

                // And then simply remove the format to get rid of the blockquote
                editor.formatter.remove('cc_blockquote_format');
            }

            editor.nodeChanged(); // refresh the button state

        };

        editor.on('init', function(e) {
            editor.formatter.register(
                'cc_blockquote_format', {
                    block: 'blockquote',
                    classes: ['cc-blockquote'],
                    //attributes: {'class': 'cc-blockquote-%value'},  // workaround for http://www.tinymce.com/develop/bugtracker_view.php?id=6472
                    wrapper: true
                }
            );
        });

        editor.addButton('BlockquoteLeft', {
            text: 'Blockquote Left',
            icon: false,
            onclick: function() {
                toggleBlockquoteFormat('left');
            },
            onPostRender: function() {
                var ctrl = this;
                editor.on('NodeChange', function(e) {
                    checkFormatMatch('left', ctrl);
                });
            }
        });

        editor.addButton('BlockquoteCenter', {
            text: 'Blockquote Center',
            icon: false,
            onclick: function() {
                toggleBlockquoteFormat('center');
            },
            onPostRender: function() {
                var ctrl = this;
                editor.on('NodeChange', function(e) {
                    checkFormatMatch('center', ctrl);
                });
            }
        });

        editor.addButton('BlockquoteRight', {
            text: 'Blockquote Right',
            icon: false,
            onclick: function() {
                toggleBlockquoteFormat('right');
            },
            onPostRender: function() {
                var ctrl = this;
                editor.on('NodeChange', function(e) {
                    checkFormatMatch('right', ctrl);
                });
            }
        });

    });
    
})(jQuery);