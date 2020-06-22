// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    Collection<TimeRange> BusyTimes = new ArrayList<TimeRange>();
    Collection<TimeRange> FreeTimes = new ArrayList<TimeRange>();
    int start_of_day = TimeRange.START_OF_DAY;
    int eod = TimeRange.END_OF_DAY;
    int prev_end_time = 0; // End time of the previous event accessed

    // Inital checks for input validity(no attendees ,time is more than 24 hours)
    if (request.getAttendees().isEmpty()) {
      FreeTimes.add(TimeRange.fromStartEnd(start_of_day, eod, true));
      return FreeTimes;
    }

    if (request.getDuration() > 24 * 60) {
      return FreeTimes;
    }

    for (Event event : events) {
      for (String attendee : request.getAttendees()) {
        if (event
            .getAttendees()
            .contains(
                attendee)) { // Make sure we only check the events of people going and ignore those
                             // who are not
          /* Overlap case one
           *   [  a  ]
           *       [  b  ]
           * <------WHOLE DAY ------>
           * If there is a prior meeting a that cuts into b, the busy time recorded for meeting b will only be from the range of (end of a -- end of b)
           */

          if (prev_end_time >= event.getWhen().start() && prev_end_time <= event.getWhen().end()) {
            BusyTimes.add(TimeRange.fromStartEnd(prev_end_time, event.getWhen().end(), false));
          }

          /* Overlap case two
           *    [    a     ]
           *      [  b  ]
           * <------WHOLE DAY ------>
           * If there is a prior meeting a that spans all of b, the busy time recorded for will only be the duration of a
           */

          if (prev_end_time >= event.getWhen().end()) {
            prev_end_time = event.getWhen().end();
            continue;
          }
          /* Regular cases
           *    [ a ]
           *            [  b  ]
           * <------WHOLE DAY ------>
           * Will add the time betweeen 2 meetings
           */

          else {
            BusyTimes.add(
                TimeRange.fromStartEnd(event.getWhen().start(), event.getWhen().end(), false));
          }

          prev_end_time = event.getWhen().end();
        }
      }
    }

    prev_end_time =
        0; // Reset prev end time to 0 , there would be no prev event for the first event of the
           // day.

    for (TimeRange time : BusyTimes) {
      TimeRange free_range = TimeRange.fromStartEnd(prev_end_time, time.start(), false);
      /* Similar logic as the Busy Time loop , this time we do not have to account for overlapping times, its already done for us.
       * If the range of free time is greater than or equal to the requested meeting duration, it will be added to FreeTimes.
       */
      if (free_range.duration() >= request.getDuration()) {
        FreeTimes.add(free_range);
      } else {
        prev_end_time = time.end();
        continue;
      }
      prev_end_time = time.end();
    }

    // One last check for any time left over between end of last event and end of day.
    if (eod - prev_end_time >= request.getDuration()) {
      FreeTimes.add(TimeRange.fromStartEnd(prev_end_time, eod, true));
    }

    return FreeTimes;
  }
}
