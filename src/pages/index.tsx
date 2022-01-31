import { Container, Grid, Button, Card } from "semantic-ui-react";
import { useRouter } from "next/router";
import Image from "next/image";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/task");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};

const Home = ({ tasks }: { tasks: any }) => {
  const router = useRouter();

  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns={1}
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <div>
              <Image
                src="/png-no-data.webp"
                alt=""
                width={300}
                height={300}
                objectFit="cover"
              />
            </div>
            <div>
              <Button primary>Create a new Task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task: any) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button
                primary
                onClick={() => router.push(`/task/${task._id}`)}
              >
                View
              </Button>
              <Button
                secondary
                onClick={() => router.push(`/task/${task._id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default Home;
