/* globals UI */

var C = UI.Views.Connector;

class EditForm extends C.View {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    if (!props.connector) {
      this.state.mode = 'connect';
    }
  }
  connect() {
    this.props.onConnect();
  }
  render() {
    return (
      <C.Page default="setup" {...this.props}>
        <C.Panel name="Setup" slug="setup">
          <C.Column type="notes">
          <h1>Adding an Intercom Connector</h1>
          <ol>
            <li>Log into your Intercom Account.</li>
            <li>Click the settings cog in right side of the main navigation, and select 'Integrations for &#123;Your App Name&#125;'.</li>
            <li>Select "API Keys" from the left hand navigation.</li>
            <li>Click "Create Full Access API Key".</li>
            <li>Copy the App Id and your new API Key from that page into this form. </li>
          </ol>
          </C.Column>
          <C.Column>
            <form
              onChange={(evt) => {this.props.updateField(evt);}}
              onSubmit={(evt) => {this.props.updateSettings(evt);}}>
              <UI.FormElements.Input
                inactive={!!(this.props.connectorInstance)}
                placeholder="Key" name="key" label="Key" type="text" value={this.props._key} />
              <UI.FormElements.Input
                placeholder="App Id" name="appId" label="App Id" type="text" value={this.props.settings.appId} />
              <UI.FormElements.Input
                placeholder="API Key" name="apiKey" label="API Key" type="text" value={this.props.settings.apiKey} />
              <UI.FormElements.Button text={'Save'} loading={this.props.saving} type="large" submit={true} onClick={this.props.updateSettings} />
            </form>
          </C.Column>
        </C.Panel>
      </C.Page>
    );
  }
}

export default EditForm;
global.EditForm = EditForm;
