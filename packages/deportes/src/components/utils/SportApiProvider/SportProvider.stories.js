import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import SportApiProvider from '.';

const env = 'test';

/**
 * Dummy class to include a button
 */
class ToBeClicked extends Component {
  /**
   * Class constructor
   * @param {Object} props of the component
   */
  constructor(props) {
    super(props);
    this.state = {
      stop: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Event handler
   */
  handleClick() {
    this.setState({ stop: true });
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { stop } = this.state;
    const btn = {
      border: 'solid 1px #ccc',
      padding: '10px',
      background: '#efefef',
      margin: '0 10px',
    };
    return (
      <div>
        <button style={btn} onClick={this.handleClick}>
          Stop Api Calls
        </button>
        Stopped:
        {' '}
        {stop ? 'Yes' : 'No'}
        <SportApiProvider
          env={env}
          path="/commentary/soccer/920517"
          refreshRate={5}
          stopRefresh={stop}
          render={(data) => {
            return (
              <div>
                <pre>
                  <code>{JSON.stringify(data)}</code>
                </pre>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

storiesOf('SportApiProvider', module)
  .add('with commentary', () => (
    <SportApiProvider
      env={env}
      path="/commentary/soccer/920517"
      render={(data) => {
        return (
          <pre>
            <code>{JSON.stringify(data)}</code>
          </pre>
        );
      }}
    />
  ))
  .add('with stats', () => (
    <SportApiProvider
      env={env}
      path="/stats/soccer/934230"
      render={(data) => {
        return (
          <div>
            <pre>
              <code>{JSON.stringify(data)}</code>
            </pre>
          </div>
        );
      }}
    />
  ))
  .add('with standings', () => (
    <SportApiProvider
      env={env}
      path="/standings/soccer/2017/199"
      render={(data) => {
        return (
          <div>
            <pre>
              <code>{JSON.stringify(data)}</code>
            </pre>
          </div>
        );
      }}
    />
  ))
  .add('with Event view', () => (
    <SportApiProvider
      env={env}
      path="/stats/soccer/934230"
      render={(data) => {
        const col = {
          width: '200px',
          float: 'left',
        };
        return (
          <div>
            <div>
              <h2>{data['sports-content']['sports-event']['event-metadata']['event-name']}</h2>
            </div>
            <div>
              <h2>Teams</h2>
              {data['sports-content']['sports-event'].team.map(team => (
                <div style={col}>
                  <h3>{team['team-metadata'].name.first}</h3>
                  {team.player.map(py => (
                    <div>{py['player-metadata'].name.first}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  ))
  .add('with error', () => (
    <SportApiProvider
      env={env}
      path="/v1/standings/xxxxx/xxxxxxxx"
      render={() => {
        return <div>Hello!</div>;
      }}
    />
  ))
  .add('with refreh', () => (
    <SportApiProvider
      env={env}
      path="/commentary/soccer/920517"
      refreshRate={5}
      render={(data) => {
        return (
          <div>
            <pre>
              <code>{JSON.stringify(data)}</code>
            </pre>
          </div>
        );
      }}
    />
  ))
  .add('with refreh and not cached', () => (
    <SportApiProvider
      env={env}
      path="/commentary/soccer/920517"
      refreshRate={5}
      cached={false}
      render={(data) => {
        return (
          <div>
            <pre>
              <code>{JSON.stringify(data)}</code>
            </pre>
          </div>
        );
      }}
    />
  ))
  .add('with refreh and stop', () => <ToBeClicked />);
