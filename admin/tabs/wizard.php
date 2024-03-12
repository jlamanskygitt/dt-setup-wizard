<?php
if ( ! defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly

function is_json( $string ) {
    json_decode( $string );
    return json_last_error() === JSON_ERROR_NONE;
}

/**
 * Class Disciple_Tools_Setup_Wizard_Tab
 */
class Disciple_Tools_Setup_Wizard_Tab
{
    public function content() {
        $setting = get_option( 'dt_setup_wizard_config' );

        if ( !is_json( $setting ) || empty( $setting ) ) {
            ?>
          <div>
            Setup Wizard has not been configured. Please enter a JSON config option on the Settings tab
            <a href='admin.php?page=disciple_tools_setup_wizard&tab=settings'>here</a>.
          </div>
            <?php
        }
        else {
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

                <?php $this->right_column( $setting ) ?>

                <!-- End Right Column -->
              </div><!-- postbox-container 1 -->
              <div id="postbox-container-2" class="postbox-container">
              </div><!-- postbox-container 2 -->
            </div><!-- post-body meta box container -->
          </div><!--poststuff end -->
        </div><!-- wrap end -->
            <?php
        }
    }

    public function main_column() {
        $parsedown = new Parsedown();

        if ( isset( $_GET['step'] ) ) {
            $step = sanitize_key( wp_unslash( $_GET['step'] ) );
        } else {
            $step = '1';
        }

        $setting = get_option( 'dt_setup_wizard_config' );
        $config = json_decode( $setting );
        ?>
        <!-- Box -->
        <?php //foreach($config->steps as $key=>$item)
                  //{
                    //$key++;
        ?>

        <table class="widefat striped">
          <thead>
          <tr>
            <th><?php echo $config->steps[$step -1]->name?></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <?php echo $parsedown->text( $config->steps[$step -1]->description )?>
            </td>
          </tr>
          </tbody>
        </table>
        <br>

        <?php
                  //} ?>
        <!-- End Box -->
        <?php
    }

    public function right_column( $setting ) {
        $config = json_decode( $setting );
        ?>
  <!-- Box -->
    Steps:

        <?php


        $link = 'admin.php?page=disciple_tools_setup_wizard&tab=wizard&step=';
        ?>

    <ol>
        <?php
        foreach ( $config->steps as $key =>$item )
        {
            $key++;
            ?>
                <li>
                  <a href="<?php echo esc_attr( $link ) . $key ?>"><?php echo $item->name ?></a>
                </li>
            <?php
        }
        ?>
    </ol>
  <br>
  <!-- End Box -->
        <?php
    }
}

