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
  showMessage(`Installing: ${plug}`);
  sendAjaxRequest('plugin:install', plug)
    .then((data) => {
      if (!data || !data.success) {
        console.error('Error installing plugin.', data);
        showMessage(`Error installing plugin ${plug}`, 'error');
      } else if (data.slug) {
        console.log('Successfully installed ' + data.slug);
        showMessage(`Installed ${plug}`, 'success');
        activate(`${data.slug}/${data.slug}.php`);
      }
    })
    .catch((error) => {
      console.error('Error installing plugin.', error);
      showMessage(`Error installing plugin ${plug}`, 'error');
    });
}

function activate(plug) {
  console.log('activating: ' + plug);
  showMessage(`Activating: ${plug}`);
  sendAjaxRequest('plugin:activate', plug)
    .then((data) => {
      if (!data || !data.success) {
        console.error('Error activated plugin.', data);
        showMessage(`Error activated plugin ${plug}`, 'error');
      } else {
        console.log('Successfully activated ' + plug);
        showMessage(`Activated ${plug}`, 'success');
      }
    })
    .catch((error) => {
      console.error('Error activating plugin.', error);
      showMessage(`Error activated plugin ${plug}`, 'error');
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
      showMessage('Config value is required', 'error');
      return;
    }

    try {
      console.log(configRaw);
      const config = JSON.parse(configRaw);

      processConfig(config);
    } catch (error) {
      console.error(error);
      showMessage('Could not parse config JSON', 'error');
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

function showMessage(content, context) {
  const container = document.getElementById('message-container');
  const message = document.createElement('li');
  message.innerHTML = content;
  if (context) {
    message.classList.add(context);
  }
  container.append(message);

  setTimeout(function () {
    message.remove();
  }, 6500);
}
