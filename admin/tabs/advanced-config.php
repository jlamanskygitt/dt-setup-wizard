<?php
if ( ! defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly

/**
 * Class Disciple_Tools_Setup_Wizard_Tab_Advanced
 */
class Disciple_Tools_Setup_Wizard_Tab_Advanced
{
    public function content() {
        ?>
        <div class="wrap tab-advanced">
          <div id="poststuff">
            <div id="post-body" class="metabox-holder columns-2">
              <div id="post-body-content">
                <!-- Main Column -->

                <?php $this->main_column() ?>

                <!-- End Main Column -->
              </div><!-- end post-body-content -->
              <div id="postbox-container-1" class="postbox-container">
                <!-- Right Column -->

                <?php $this->right_column() ?>

                <!-- End Right Column -->
              </div><!-- postbox-container 1 -->
              <div id="postbox-container-2" class="postbox-container">
              </div><!-- postbox-container 2 -->
            </div><!-- post-body meta box container -->
          </div><!--poststuff end -->
        </div><!-- wrap end -->
        <?php
    }

    public function main_column() {
        ?>
        <!-- Box -->
        <table class="widefat striped">
          <thead>
          <tr>
            <th>Advanced Config</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <form name="advancedConfig" onsubmit="advancedConfigSubmit(event)">
                <label for="config">JSON Config</label>
                <textarea id="config" name="config" class="auto-expand" data-min-rows="3"></textarea>

                <button type="submit">Submit</button>
              </form>
            </td>
          </tr>
          </tbody>
        </table>
        <br>
        <!-- End Box -->
        <?php
    }

    public function right_column() {
        $sample = array(
            'plugins' => array(
                'https://github.com/DiscipleTools/disciple-tools-webform/releases/latest/download/disciple-tools-webform.zip',
                'https://github.com/DiscipleTools/disciple-tools-mobile-app-plugin/releases/latest/download/disciple-tools-mobile-app-plugin.zip',
            ),
            'users' => array(
                array(
                    'username' => 'testuser',
                    'email' => 'test@test.com',
                    'roles' => array(
                        'multiplier',
                        'partner',
                    ),
                    'displayName' => 'John Doe',
                ),
            ),
            'options' => array(
                array(
                    'key' => 'blogname',
                    'value' => 'My DT site',
                ),
                array(
                    'key' => 'dt_field_customizations',
                    'value' => array(
                        'contacts' => array(
                            'coached_by' => array(
                                'name' => 'Discipled by',
                            ),
                        ),
                    ),
                    'overwrite' => true,
                ),
            ),
        );
        ?>
    <!-- Box -->
    <table class="widefat striped">
      <thead>
      <tr>
        <th>JSON Sample</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="overflow-scroll">
          <pre><code><?php echo json_encode( $sample, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ) ?></code></pre>
        </td>
      </tr>
      </tbody>
    </table>
    <br>
    <!-- End Box -->
        <?php
    }
}

