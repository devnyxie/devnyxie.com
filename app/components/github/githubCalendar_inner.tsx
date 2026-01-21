import { getConfig } from "@/lib/app.config";
import React, { useState, useEffect } from "react";
import ActivityCalendar, { Activity } from "react-activity-calendar";
import colors from "tailwindcss/colors";

interface Props {
  resolvedTheme: "dark" | "light";
}

const GithubCalendarInner: React.FC<Props> = ({ resolvedTheme }) => {
  const [data, setData] = useState<Activity[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { github_username } = getConfig();
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${github_username}?y=last`
        );
        const result = await response.json();
        if (result) {
          setData(result.contributions);
        }
      } catch (error: unknown) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      {data && data.length > 0 && (
        <ActivityCalendar
          data={data}
          blockSize={10}
          hideTotalCount={false}
          theme={{
            light: [
              "hsl(0, 0%, 88%)",
              colors.green[400],
              colors.green[500],
              colors.green[600],
              colors.green[700],
            ],
            dark: [
              "#333",
              colors.green[800],
              colors.green[700],
              colors.green[600],
              colors.green[500],
            ],
          }}
          colorScheme={resolvedTheme}
        />
      )}
    </div>
  );
};

export default GithubCalendarInner;
