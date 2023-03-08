<?php

class PluginTest extends TestCase
{
    public function test_plugin_installed() {
        activate_plugin( 'disciple-tools-setup-wizard/disciple-tools-setup-wizard.php' );

        $this->assertContains(
            'disciple-tools-setup-wizard/disciple-tools-setup-wizard.php',
            get_option( 'active_plugins' )
        );
    }
}
