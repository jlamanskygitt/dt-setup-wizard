function sendAjaxRequest(key, value) {
  var data = new FormData();
  var nonce = document.getElementById('security_headers_nonce').value;
  data.append('security_headers_nonce', nonce);
  data.append('action', 'dt_setup_wizard_ajax');
  data.append('key', key);
  data.append('value', value);

  return fetch(ajaxurl, {
    method: 'POST',
    body: data,
  }).then((response) => response.json());
}

function install(plug) {
  console.log('installing: ' + plug);
  sendAjaxRequest('plugin:install', plug)
    .then((data) => {
      if (!data || !data.success) {
        console.error('Error installing plugin.', data);
      } else if (data.slug) {
        console.log('Successfully installed ' + data.slug);
        activate(`${data.slug}/${data.slug}.php`);
      }
    })
    .catch((error) => {
      console.error('Error installing plugin.', error);
    });
}

function activate(plug) {
  console.log('activating: ' + plug);
  sendAjaxRequest('plugin:activate', plug)
    .then((data) => {
      if (!data || !data.success) {
        console.error('Error activated plugin.', data);
      } else {
        console.log('Successfully activated ' + plug);
      }
    })
    .catch((error) => {
      console.error('Error activating plugin.', error);
    });
}

function advancedConfigSubmit(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const formData = new FormData(evt.target);
    const configRaw = formData.get('config');
    if (!configRaw) {
      console.error('Config value is required');
    }

    try {
      console.log(configRaw);
      const config = JSON.parse(configRaw);

      processConfig(config);
    } catch (error) {
      console.error(error);
    }
    // console.log('submitting', formData);
    // install('https://github.com/DiscipleTools/disciple-tools-webform/releases/latest/download/disciple-tools-webform.zip');
    // activate('disciple-tools-webform/disciple-tools-webform.php');
    // return false;
}

function processConfig(config) {
  console.log('Processing: ', config);

  if (config.plugins) {
    for (plugin of config.plugins) {
      install(plugin);
    }
  }
}
