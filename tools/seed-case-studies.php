<?php
/**
 * Safe, Idempotent Case Study Seeder for Local WordPress
 *
 * Populates the 6 published case studies from the reference XML export into
 * the active LocalWP database, including standard fields and ACF postmeta.
 *
 * Usage:
 * php -c <path_to_php.ini> tools/seed-case-studies.php
 */

// Load WordPress environment
$wp_load = 'C:/Users/Pythonhero/Local Sites/oderinde-cms/app/public/wp-load.php';
if (!file_exists($wp_load)) {
    echo "ERROR: wp-load.php not found at: {$wp_load}\n";
    exit(1);
}

require_once $wp_load;

echo "Seeding case studies into WordPress at: " . site_url() . "\n";

$case_studies = [
    [
        'id'          => 96087,
        'slug'        => 'born-accelerators-case-study-website',
        'title'       => 'BORN Accelerators building a bilingual launch platform around a moving campaign',
        'excerpt'     => 'Sport, Health & Tech accelerator website built to explain a new ecosystem, support German and English audiences, route startups and investors toward the right action, and still launch while campaign priorities were changing.',
        'thumbnail'   => 96103,
        'meta'        => [
            'business_focus'   => 'Launch a credible bilingual accelerator platform without waiting for every campaign detail to stop changing.',
            'system_delivered' => 'A bilingual WordPress + Elementor system connecting content, conversion, proof and launch operations.',
            'verified_outcome' => 'The Fiverr review recorded 5/5 Quality, 5/5 Value and 4/5 Communication. The client described the finished result as stable and solid after a complex bilingual launch.',
            'technology_1'     => 'WordPress',
            'technology_2'     => 'Elementor',
            'technology_3'     => 'Bilingual UX',
            'color'            => '2563eb',
        ],
    ],
    [
        'id'          => 96102,
        'slug'        => 'agentur-ostwest-turning-an-outdated-agency-site-into-a-clean-bilingual-portfolio',
        'title'       => 'Agentur Ostwest turning an outdated agency site into a clean bilingual portfolio',
        'excerpt'     => 'A focused DE/EN WordPress redesign for a German voice-over agency: simpler structure, stronger portfolio presentation, clearer navigation and a content workflow the client could continue managing himself.',
        'thumbnail'   => 96104,
        'meta'        => [
            'business_focus'   => 'Modernize the agency presentation without making content ownership harder.',
            'system_delivered' => 'A one-page bilingual WordPress portfolio with reusable presentation blocks and clean navigation.',
            'verified_outcome' => 'The final Fiverr review gave 5/5 for Communication, 5/5 for Quality and 5/5 for Value. The client\'s review: "Perfekte Lieferung! Vielen Dank!"',
            'technology_1'     => 'WordPress',
            'technology_2'     => 'Bilingual UX',
            'technology_3'     => 'Responsive UX',
            'color'            => '2563eb',
        ],
    ],
    [
        'id'          => 96108,
        'slug'        => 'bau-helden-website-redesign-case-study',
        'title'       => 'Bau Helden turning a direct order into a structured redesign process',
        'excerpt'     => 'A three-page German WordPress redesign that began without normal pre-sale discovery, moved through visual planning and mobile refinement, and became the design reference for the client\'s next, larger engagement.',
        'thumbnail'   => 96109,
        'meta'        => [
            'business_focus'   => 'Turn a direct order with limited discovery into a clear, credible construction-company website.',
            'system_delivered' => 'A three-page WordPress redesign shaped through pre-design, responsive refinement and transparent asset handoff.',
            'verified_outcome' => 'The strongest proof is retention. The same buyer later returned with a larger website and explicitly said: "I\'d like a similar style to Bau-Helden you built that as well."',
            'technology_1'     => 'WordPress',
            'technology_2'     => 'Elementor',
            'technology_3'     => 'Responsive UX',
            'color'            => '2563eb',
        ],
    ],
    [
        'id'          => 96110,
        'slug'        => 'einbruchschutz-baumgaertner-modernizing-website-redesign-case-study',
        'title'       => 'Einbruchschutz Baumgaertner modernizing an 11-page security site while protecting what already worked',
        'excerpt'     => 'A larger repeat-client WordPress engagement covering visual redesign, responsive rebuilding, on-page SEO, video, manufacturer proof, Google reviews, staging and production migration for a German security business.',
        'thumbnail'   => 96111,
        'meta'        => [
            'business_focus'   => 'Modernize a live security-company website without discarding established brand equity.',
            'system_delivered' => 'An 11-page WordPress redesign combining staging, responsive rebuild, SEO, proof integrations and controlled migration.',
            'verified_outcome' => 'The buyer returned after Bau-Helden and commissioned a significantly larger 11-page redesign. The client explained: "I accepted your price after seeing that the work on Bau-Helden matched what I needed. I hired you for another website."',
            'technology_1'     => 'WordPress',
            'technology_2'     => 'On-page SEO',
            'technology_3'     => 'Trustindex',
            'color'            => '2563eb',
        ],
    ],
    [
        'id'          => 96180,
        'slug'        => 'samuel-edmond-stone-landing-page',
        'title'       => 'Doug Steinman building a launch-ready author website for Samuel Edmond Stone',
        'excerpt'     => 'Doug needed help creating an online presence for the Samuel Edmondstone / Homeless Trilogy project. The work started around improving the website experience and later expanded into helping establish supporting social media presence.',
        'thumbnail'   => 96181,
        'meta'        => [
            'business_focus'   => 'Create a professional online presence for an upcoming book project with a clear structure for readers and visitors.',
            'system_delivered' => 'A WordPress author website with a focused landing page, book presentation sections and clear calls to action.',
            'verified_outcome' => 'The final Fiverr review gave 5/5 for Communication, 5/5 for Quality and 5/5 for Value. The client\'s review: "I want a price to add the trilogy page and a couple more pages for the two new books into the website you made."',
            'technology_1'     => 'WordPress',
            'technology_2'     => 'Hosting Setup',
            'technology_3'     => 'Responsive Design',
            'color'            => '2563eb',
        ],
    ],
    [
        'id'          => 96182,
        'slug'        => 'pipe-patch-pro-amazon-listing-website',
        'title'       => 'Pipe Patch Pro WordPress Product Website Development',
        'excerpt'     => 'A WordPress product website featuring three pipe-repair kits, Amazon purchase links and WooCommerce infrastructure.',
        'thumbnail'   => 96183,
        'meta'        => [
            'business_focus'   => 'Standalone product website for three pipe-repair kits.',
            'system_delivered' => 'WordPress product website with WooCommerce and Amazon links.',
            'verified_outcome' => 'Website launched; direct WooCommerce payments pending client onboarding.',
            'technology_1'     => 'WordPress',
            'technology_2'     => 'WooCommerce',
            'technology_3'     => 'Hostinger',
            'color'            => '2563eb',
        ],
    ],
];

// ACF field key mappings
$acf_field_keys = [
    'business_focus'   => 'field_6a7f3d427aac5',
    'system_delivered' => 'field_6a7f3e067aac6',
    'verified_outcome' => 'field_6a7f3e1b7aac7',
    'technology_1'     => 'field_6a7f3e2c7aac8',
    'technology_2'     => 'field_6a7f3e3b7aac9',
    'technology_3'     => 'field_6a7f3e497aaca',
    'color'            => 'field_6a7f6138962f1',
];

global $wpdb;

foreach ($case_studies as $cs) {
    // Check if post already exists by slug or exact ID
    $existing = get_posts([
        'name'        => $cs['slug'],
        'post_type'   => 'case-study',
        'post_status' => 'any',
        'numberposts' => 1,
    ]);

    if (!empty($existing)) {
        $post_id = $existing[0]->ID;
        echo "Updating existing Case Study [{$post_id}] {$cs['slug']}...\n";
        wp_update_post([
            'ID'           => $post_id,
            'post_title'   => $cs['title'],
            'post_excerpt' => $cs['excerpt'],
            'post_status'  => 'publish',
        ]);
    } else {
        echo "Inserting Case Study [ID: {$cs['id']}] {$cs['slug']}...\n";
        // Check if ID is free
        $id_taken = $wpdb->get_var($wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE ID = %d", $cs['id']));
        
        $post_args = [
            'post_title'   => $cs['title'],
            'post_name'    => $cs['slug'],
            'post_excerpt' => $cs['excerpt'],
            'post_status'  => 'publish',
            'post_type'    => 'case-study',
        ];

        if (!$id_taken) {
            $post_args['import_id'] = $cs['id'];
        }

        $post_id = wp_insert_post($post_args);
        if (is_wp_error($post_id)) {
            echo "ERROR inserting {$cs['slug']}: " . $post_id->get_error_message() . "\n";
            continue;
        }
    }

    // Assign featured image / thumbnail if attachment exists
    if (!empty($cs['thumbnail'])) {
        $thumb_exists = get_post($cs['thumbnail']);
        if ($thumb_exists) {
            set_post_thumbnail($post_id, $cs['thumbnail']);
        }
    }

    // Set ACF metadata
    foreach ($cs['meta'] as $meta_key => $meta_val) {
        update_post_meta($post_id, $meta_key, $meta_val);
        if (isset($acf_field_keys[$meta_key])) {
            update_post_meta($post_id, '_' . $meta_key, $acf_field_keys[$meta_key]);
        }
    }

    echo "  -> Saved metadata for {$cs['slug']} (Post ID: {$post_id})\n";
}

flush_rewrite_rules();
echo "Seeding completed successfully! Total Case Studies: " . count($case_studies) . "\n";
