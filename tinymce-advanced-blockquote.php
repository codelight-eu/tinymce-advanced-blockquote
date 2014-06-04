<?php
/**
 * Plugin Name: TinyMCE Advanced Blockquote
 * Description: Add two blockquote buttons to TinyMCE for better control over styling and wrappers. Based on http://wordpress.stackexchange.com/a/139164/37584
 * Plugin URI: http://codelight.eu
 * Version: 1.0
 * Author: Codelight 
 * Author URI: http://codelight.eu
 */

function cc_add_tinymce() {
    global $typenow;
    
    if( ! in_array( $typenow, array( 'post', 'page' ) ) )
        return ;
    
    add_filter( 'mce_external_plugins', 'cc_add_tinymce_plugin' );
    add_filter( 'mce_buttons', 'cc_add_tinymce_button' );
}
add_action( 'admin_head', 'cc_add_tinymce' );

function cc_add_tinymce_plugin( $plugin_array ) {
    $plugin_array['blockquote'] = plugins_url( '/blockquote.js', __FILE__ );
    return $plugin_array;
}

function cc_add_tinymce_button( $buttons ) {
    array_push( $buttons, 'BlockquoteLeft' );
    array_push( $buttons, 'BlockquoteCenter' );
    array_push( $buttons, 'BlockquoteRight' );
    return $buttons;
}