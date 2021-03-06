import React from "react";
import Image from "next/image";
import { Container, Menu, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Link href="/">
            <a>
              <Image
                src="/favicon.ico"
                alt=""
                width={50}
                height={50}
              />
            </a>
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              primary
              size="mini"
              onClick={() => router.push("/task/create")}
            >
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
