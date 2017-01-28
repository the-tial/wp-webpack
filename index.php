<?php
/**
 * TODO Change it however you want
 * This is the example index.php file. I'm pretty sure you have better idea for it
 */
?>
<?php get_header(); ?>
    <div class="main">
        <div class="main_content">
            <div class="example-img"></div>
            <div class="markdown-body">
                <?php echo parseReadme(); ?>
            </div>
        </div>
    </div>
<?php get_footer();
