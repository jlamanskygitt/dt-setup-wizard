function sendAjaxRequest(key, value) {
  var data = new FormData();
  var nonce = document.getElementById('security_headers_nonce').value;
  data.append('security_headers_nonce', nonce);
  data.append('action', 'dt_setup_wizard_ajax');
  data.append('key', key);
  data.append('value', JSON.stringify(value));

  return fetch(ajaxurl, {
    method: 'POST',
    body: data,
  }).then((response) => response.json())
    .then((data) => {
      if (!data || !data.success) {
        throw data;
      }
      return data;
    });
}

function install(plug) {
  console.log('installing: ' + plug);
  showMessage(`Installing: ${plug}`);
  sendAjaxRequest('plugin:install', plug)
    .then((data) => {
      if (data.slug) {
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
      console.log('Successfully activated ' + plug);
      showMessage(`Activated ${plug}`, 'success');
    })
    .catch((error) => {
      console.error('Error activating plugin.', error);
      showMessage(`Error activated plugin ${plug}`, 'error');
    });
}

function createUser(user) {
  console.log('creating user: ', user);
  showMessage(`Creating user: ${user.username}`);
  sendAjaxRequest('user:create', user)
    .then((data) => {
      if (data.userId) {
        console.log('Created user', data.user);
        showMessage(`Created user: ${user.username} (#${data.userId})`, 'success');
      }
    })
    .catch((error) => {
      console.error('Error creating user', error);
      showMessage(`Error creating user: ${user.username}`, 'error');
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

  if (config.users) {
    for (user of config.users) {
      createUser(user);
    }
  }
}

function createMessageLi(content, context) {
  const message = document.createElement('li');
  message.innerHTML = content;
  if (context) {
    message.classList.add(context);
  }
  return message;
}
function showMessage(content, context) {
  const msgContainer = document.getElementById('message-container');
  const message = createMessageLi(content, context);
  msgContainer.append(message);

  const logContainer = document.getElementById('log-container');
  const log = createMessageLi(content, context);
  const logs = logContainer.getElementsByClassName('logs');
  if (logs && logs.length) {
    logs[0].append(log);
    logs[0].scrollTo(0, logs[0].scrollHeight);
  }

  setTimeout(function () {
    message.remove();
  }, 6500);
}
function toggleLogContainer(evt) {
  const container = document.getElementById('log-container');
  if (container) {
    container.classList.toggle('expand');
  }
  const dashicons = (evt.currentTarget || evt.target).getElementsByClassName('dashicons');
  if (dashicons) {
    for (dashicon of dashicons) {
      dashicon.classList.toggle('dashicons-arrow-down-alt2');
      dashicon.classList.toggle('dashicons-arrow-up-alt2');
    }
  }
}

function onExpandableTextareaInput({ target:elm }){
  // make sure the input event originated from a textarea and it's desired to be auto-expandable
  if( !elm.classList.contains('auto-expand') || !elm.nodeName == 'TEXTAREA' ) return

  if (elm.scrollHeight > elm.offsetHeight) {
    elm.style.minHeight = `calc(${elm.scrollHeight}px + 2rem)`;
  }
}
// global delegated event listener
document.addEventListener('input', onExpandableTextareaInput)
