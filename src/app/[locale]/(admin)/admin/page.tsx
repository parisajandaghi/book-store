import { Title, Text } from "@mantine/core";

export default function AdminDashboardPage() {
  return (
    <div>
      <Title order={2} c="surface.5" mb="md">
        داشبورد اصلی
      </Title>
      <Text c="textMain.0">
        به پنل مدیریت فروشگاه کتاب خوش آمدید. در اینجا می‌توانید آمار کلی سیستم
        را مشاهده کنید.
      </Text>
    </div>
  );
}
