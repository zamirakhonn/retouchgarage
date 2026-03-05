<?php
function retouchgarage_scripts() {
    wp_enqueue_style( 'main-style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'retouchgarage_scripts' );
?>
