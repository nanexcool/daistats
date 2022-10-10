import React from 'react';

export { MeetingTime as default };

var now = new Date()

// Community Meeting - 5:00 PM UTC Tuesdays
var communityMeeting = now.getDay() === 2 && now.getUTCHours() === 17
var communityTitle = "GSU protocol Community Meeting"
var communityUrl = "https://zoom.us/j/697074715"

// Governance/Risk Meeting - 5:00 PM UTC Thursdays
var riskMeeting = now.getDay() === 4 && now.getUTCHours() === 17
var riskTitle = "MakerDAO Governance and Risk Meeting"
var riskUrl = "https://zoom.us/j/697074715"

function MeetingNote(props) {
  if (props.show) {
    return (
      <div className="columns">
        <div className="column">
          <div className="box has-text-centered">
            <h4 className="subtitle is-size-4">{props.title} is happening now!</h4>
            <h4><a href={props.url}>{props.url}</a></h4>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

function MeetingTime(props) {

  return (
    <React.Fragment>
      <MeetingNote show={communityMeeting} title={communityTitle} url={communityUrl} />
      <MeetingNote show={riskMeeting} title={riskTitle} url={riskUrl} />
    </React.Fragment>
  );
}
