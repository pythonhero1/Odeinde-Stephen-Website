<?php
/**
 * Custom Post Types Registration
 *
 * @package OderindeHeadless
 */

if (!defined('ABSPATH')) {
    exit;
}

class OS_Headless_Post_Types {

    public static function init() {
        add_action('init', [__CLASS__, 'register_post_types']);
        add_filter('manage_enquiry_posts_columns', [__CLASS__, 'enquiry_admin_columns']);
        add_action('manage_enquiry_posts_custom_column', [__CLASS__, 'enquiry_admin_column_content'], 10, 2);
    }

    /**
     * Register Custom Post Types.
     */
    public static function register_post_types() {
        // 1. Case Study (Public REST)
        $case_study_labels = [
            'name'                  => __('Case Studies', 'oderinde-headless'),
            'singular_name'         => __('Case Study', 'oderinde-headless'),
            'menu_name'             => __('Case Studies', 'oderinde-headless'),
            'all_items'             => __('All Case Studies', 'oderinde-headless'),
            'add_new_item'          => __('Add New Case Study', 'oderinde-headless'),
            'edit_item'             => __('Edit Case Study', 'oderinde-headless'),
            'view_item'             => __('View Case Study', 'oderinde-headless'),
            'search_items'          => __('Search Case Studies', 'oderinde-headless'),
            'not_found'             => __('No case studies found', 'oderinde-headless'),
            'not_found_in_trash'    => __('No case studies found in Trash', 'oderinde-headless'),
        ];

        register_post_type('case-study', [
            'labels'             => $case_study_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_admin_bar'  => true,
            'show_in_nav_menus'  => true,
            'show_in_rest'       => true,
            'rest_base'          => 'case-study',
            'rest_namespace'     => 'wp/v2',
            'has_archive'        => false,
            'hierarchical'       => false,
            'rewrite'            => ['slug' => 'case-study', 'with_front' => true],
            'supports'           => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'page-attributes'],
            'menu_icon'          => 'dashicons-portfolio',
        ]);

        // 2. Enquiry (Private, Non-REST, Capability Restricted)
        $enquiry_labels = [
            'name'                  => __('Client Enquiries', 'oderinde-headless'),
            'singular_name'         => __('Client Enquiry', 'oderinde-headless'),
            'menu_name'             => __('Enquiries', 'oderinde-headless'),
            'all_items'             => __('All Enquiries', 'oderinde-headless'),
            'view_item'             => __('View Enquiry', 'oderinde-headless'),
            'search_items'          => __('Search Enquiries', 'oderinde-headless'),
            'not_found'             => __('No enquiries found', 'oderinde-headless'),
            'not_found_in_trash'    => __('No enquiries found in Trash', 'oderinde-headless'),
        ];

        register_post_type('enquiry', [
            'labels'             => $enquiry_labels,
            'public'             => false,
            'publicly_queryable' => false,
            'exclude_from_search'=> true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_admin_bar'  => false,
            'show_in_nav_menus'  => false,
            'show_in_rest'       => false, // Strictly isolated from REST API
            'has_archive'        => false,
            'hierarchical'       => false,
            'supports'           => ['title'],
            'menu_icon'          => 'dashicons-email-alt',
            'capability_type'    => 'enquiry',
            'map_meta_cap'       => true,
            'capabilities'       => [
                'create_posts'   => 'do_not_allow', // UI creation disabled; API intake only
                'edit_post'      => 'manage_options',
                'read_post'      => 'manage_options',
                'delete_post'    => 'manage_options',
                'edit_posts'     => 'manage_options',
                'delete_posts'   => 'manage_options',
            ],
        ]);
    }

    /**
     * Custom admin columns for Enquiries.
     */
    public static function enquiry_admin_columns($columns) {
        return [
            'cb'          => '<input type="checkbox" />',
            'title'       => __('Subject', 'oderinde-headless'),
            'client_name' => __('Client Name', 'oderinde-headless'),
            'email'       => __('Email Address', 'oderinde-headless'),
            'service'     => __('Service Requested', 'oderinde-headless'),
            'budget'      => __('Budget', 'oderinde-headless'),
            'date'        => __('Date Received', 'oderinde-headless'),
        ];
    }

    /**
     * Populate custom column data for Enquiries.
     */
    public static function enquiry_admin_column_content($column, $post_id) {
        switch ($column) {
            case 'client_name':
                echo esc_html(get_post_meta($post_id, 'client_name', true) ?: '-');
                break;
            case 'email':
                $email = get_post_meta($post_id, 'client_email', true);
                if ($email) {
                    echo '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>';
                } else {
                    echo '-';
                }
                break;
            case 'service':
                echo esc_html(get_post_meta($post_id, 'service', true) ?: '-');
                break;
            case 'budget':
                echo esc_html(get_post_meta($post_id, 'budget', true) ?: '-');
                break;
        }
    }
}
